<?php
namespace Vanderbilt\REDCap\Classes\Email;

class  EmailUsers
{

    const PAGE_START = 1;
    const PER_PAGE = 50;

    private $username;

    public function __construct($username)
    {
        $this->username = $username;
    }

    public function getSettings()
    {
        $systemSettings = \System::getConfigVals();
        $languageGlobal = @$systemSettings['language_global'];
        
        $lang = \Language::getLanguage($languageGlobal);
        $user = $this->getUserEmails();
        $settings = $this->getSystemSettings();
        return compact('lang', 'user', 'settings');
    }
    
    function getSystemSettings()
    {
        $systemSettings = \System::getConfigVals();

        $cdisEnabled = function() use($systemSettings) {
            $fhir_ddp_enabled = boolval(@$systemSettings['fhir_ddp_enabled']);
            $fhir_data_mart_create_project = boolval(@$systemSettings['fhir_data_mart_create_project']);
            $cdis_enabled = ($fhir_ddp_enabled || $fhir_data_mart_create_project);
            return $cdis_enabled;
        };

        $userMessagingEnabled = boolval(@$systemSettings['user_messaging_enabled']);

        $settings = [
            'cdis_enabled' => $cdisEnabled(),
            'user_messaging_enabled' => $userMessagingEnabled,
            'authentication_method' => $authentication_method = @$systemSettings['auth_meth_global'],
            // check if LDAP is enabled (or the Australian Access Federation)
            'ldap_enabled' => preg_match('/(ldap_table)|(^aaf)/i', $authentication_method)===1,
        ];
        return $settings;
    }

    function getUserEmails() {
        $queryString = "SELECT username, user_email, user_email2, user_email3 FROM redcap_user_information WHERE username = ?";
        $result = db_query($queryString, [$this->username]);
        $user = [
            'username' => '',
            'emails' => [],
        ];
        if($result && ($row = db_fetch_assoc($result))) {
            $user['username'] = @$row['username'];
            if(@$row['user_email']) $user['emails'][] = @$row['user_email'];
            if(@$row['user_email2']) $user['emails'][] = @$row['user_email2'];
            if(@$row['user_email3']) $user['emails'][] = @$row['user_email3'];
        }
        return $user;
        
    }

    public function getUsers($page=1, $perPage=50, $words=[])
    {
        $page = intval($page);
        $perPage = intval($perPage);

        $start = ($page-1) * $perPage;

        $generator = $this->usersGenerator($start, $perPage, $words);
        $metadata = $generator->current();
        $generator->next();

        $users = [];
        while($user=$generator->current()) {
            $generator->next();
            $users[] = $user;
        }

        return [
            "metadata" => $metadata,
            'data' => $users,
        ];
    }

    private function usersGenerator($start=0, $limit=0, $words=[])
    {
        // helper function to add a filter using words on selected columns
        $makeFilter = function($totalWords=0) {
            $filterableColumns = ['username','user_firstname','user_lastname','user_email'];
            $joinedFilterable = implode(', ', $filterableColumns);
            $unitSeparator = chr(31);
            $filters =  array_fill(0, $totalWords, "CONCAT_WS('$unitSeparator', $joinedFilterable) LIKE ?");
            return implode(PHP_EOL."OR ", $filters);

        };
        $subQuery = $this->getUsersQuery();

        // first get the unfiltered total
        $totalResult = db_query($subQuery);
        $count = db_num_rows($totalResult);

        $queryParams = []; // store the parameters the will be prepared in the query
        // apply the limit
        $queryString = "SELECT * FROM ($subQuery) AS users";
        if(count($words)) {
            $words = array_map(function($word) { return "%$word%"; }, $words);
            $filter = $makeFilter(count($words));
            $queryString .= " WHERE ($filter)";
            $queryParams = array_merge($queryParams, $words); // add for prepare
        }
        if($start>=0 && $limit>0) {
            $queryString .= " LIMIT ?, ?";
            $queryParams = array_merge($queryParams, [$start, $limit]); // add for prepare
        }
        $result = db_query($queryString, $queryParams);
        $partialCount = db_num_rows($result);

        $metadata = [
            'count' => $count,
            'partial_count' => $partialCount,
        ];
        yield $metadata; // first yield result is metedata

        while($row = db_fetch_assoc($result)) {
            yield array_sanitize_utf8($row); // yield all filtered projects
        }
    }

    private function getUsersQuery() {
        global $autologout_timer;

        $survey_respondent = db_escape(\System::SURVEY_RESPONDENT_USERID);
        $logoutWindow = date("Y-m-d H:i:s", mktime(date("H"),date("i")-$autologout_timer,date("s"),date("m"),date("d"),date("Y")));
        $onlineUsersQueryString = "SELECT
        DISTINCT(TRIM(LOWER(v.user))) AS user
        FROM redcap_sessions AS s, redcap_log_view AS v
        WHERE v.user != '$survey_respondent' AND v.session_id = s.session_id and v.ts >= '$logoutWindow'";

        $cdisUsersQueryString = "SELECT DISTINCT ui.username
        FROM redcap_user_information AS ui
        LEFT JOIN redcap_user_rights AS ur
        ON ur.username=ui.username
        WHERE ur.realtime_webservice_adjudicate=1
        OR ui.ui_id IN (SELECT DISTINCT token_owner FROM redcap_ehr_access_tokens)";

        $queryString = "SELECT DISTINCT
        i.ui_id, TRIM(LOWER(i.username)) AS username,
        i.user_firstname, i.user_lastname, i.user_email,
        i.user_suspended_time, IF(i.user_lastactivity > i.user_lastlogin, i.user_lastactivity, i.user_lastlogin) AS user_lastactivity,
        IF (a.username IS NULL, 0, 1) AS table_based_user,
        
        # user rights
        MAX( IF(ur.api_token, 1, 0) ) AS has_api_token,
        MAX( IF(((ur.user_rights=1 OR ur.design=1) AND p.date_deleted is null AND p.completed_time is null), 1, 0 ) ) AS is_project_owner,
        MAX( IF(ur.mobile_app=1, 1, 0) ) AS has_mobile_app_rights,

        # CDIS users
        IF(a.username IN ($cdisUsersQueryString), true, false) AS cdis_user,
        
        # online users
        IF(a.username IN ($onlineUsersQueryString), true, false) AS online


        FROM redcap_user_information AS i
        LEFT JOIN redcap_auth AS a ON a.username = i.username
        LEFT JOIN redcap_user_rights AS ur ON ur.username = i.username
        LEFT JOIN redcap_projects p ON ur.project_id = p.project_id
        WHERE i.username != '' AND i.display_on_email_users = 1
        GROUP BY i.ui_id
        ORDER BY TRIM(LOWER(i.username))";

        return $queryString;
    }
	
}