<?php namespace SomeNamespace\TestModule;
// Make sure the following lines are replaced before the scan
// @codingStandardsIgnoreFile
// phpcs:ignoreFile

use ExternalModules\ExternalModules;

class TestModule extends \ExternalModules\AbstractExternalModule{
    function testNewFunctionsSniff(){
        array_key_last([]); // Should not be reported since REDCap includes it via a polyfill
        fpm_get_status(); // Should be reported
    }

    function misc(){
        echo $_GET['direct-echo'];
        echo $this->return();
        echo \REDCap::getData();

        /**
         * We consider any data coming from the DB as tainted, since values in many tables may be user generated.
         * This is conceptually similar to what REDCap does when stripping javascript from field values before piping them.
         */
        echo $this->query()->fetch_all();
        echo $this->query()->fetch_array();
        echo $this->query()->fetch_assoc();
        echo $this->query()->fetch_column();
        echo $this->query()->fetch_object();
        echo $this->query()->fetch_row();

        global $rc_connection;
        echo mysqli_fetch_all($rc_connection);
        echo mysqli_fetch_array($rc_connection);
        echo mysqli_fetch_assoc($rc_connection);
        echo mysqli_fetch_column($rc_connection);
        echo mysqli_fetch_object($rc_connection);
        echo mysqli_fetch_row($rc_connection);

        echo db_fetch_array($rc_connection);
        echo db_fetch_assoc($rc_connection);
        echo db_fetch_object($rc_connection);
        echo db_fetch_row($rc_connection);
        echo db_result($rc_connection);
    }

    function afterExpressionAnalysis_propertyTaints(){
        // Objects assigned to vars
        $project = new \Project;
        echo $project->metadata;

        // Direct instantiations
        echo (new \Project)->metadata;
    }

    function afterMethodCallAnalysis_methodTaints(){
        // Objects assigned to vars
        $project = new \Project;
        echo $project->getGroups();

        // Direct instantiations
        echo (new \Project)->eventsToCSV();

        // Static methods
        echo \Project::getDataEntry();

        // Should NOT report a taint
        echo \Logging::getLogEventTable();
        echo \REDCap::getLogEventTable();
    }

    /**
     * Most of these lines cause two taints. One for passing a $_GET param into a query string.
     * Another for echoing data coming back from the query.  The two are unrelated,
     * but it made things a little simpler to use a single call to test both.
     */
    function queryRelated(){
        global $rc_connection;

        echo db_query($_GET['db_query'])->fetch_assoc();
        echo $this->query($_GET['query 1'])->fetch_assoc();
        echo $this->framework->query($_GET['query 2'])->fetch_assoc();
        echo ExternalModules::query($_GET['query 3'])->fetch_assoc();
        echo mysqli_query($rc_connection, $_GET['mysqli_query'])->fetch_assoc();
        echo $rc_connection->query($_GET['mysqli::query'])->fetch_assoc();

        echo $this->createQuery()->add($_GET['Query::add() 1'])->execute()->fetch_assoc();
        echo $this->framework->createQuery()->add($_GET['Query::add() 2'])->execute()->fetch_assoc();

        echo $this->queryData($_GET['queryData 1'], [])->fetch_assoc();
        echo $this->framework->queryData($_GET['queryData 2'], [])->fetch_assoc();
        echo $this->getProject()->queryData($_GET['queryData 3'], [])->fetch_assoc();
        echo $this->framework->getProject()->queryData($_GET['queryData 4'], [])->fetch_assoc();

        echo $this->queryLogs($_GET['queryLogs 1'], [])->fetch_assoc();
        echo $this->framework->queryLogs($_GET['queryLogs 2'], [])->fetch_assoc();

        $this->getQueryLogsSql($_GET['getQueryLogsSql 1']);
        $this->framework->getQueryLogsSql($_GET['getQueryLogsSql 2']);
    }

    function taintsIgnoredByREDCapPsalmPlugin(){
        curl_init(db_query('whatever')->fetch_assoc());
        curl_init(db_fetch_assoc());
        curl_init(\REDCap::getData());
        
        header('Content-Disposition: attachment; filename="' . $_GET['bad'] . '"');
    }

    function queriesWithoutTaints(){
        global $rc_connection;

        // Make sure these don't cause taints
        db_query(db_escape($_GET['whatever']));
        db_query(db_real_escape_string($_GET['whatever']));
        db_query(mysqli_real_escape_string($rc_connection, $_GET['whatever']));
    }

    function return(){
        return $_GET['return'];
    }

    /**
     * @psalm-taint-escape html
     */
    function psalmEscapeAttribute(){}
    
    function phpcsDisableFlags(){
        // Make sure the following line is replaced before the scan
        // @codingStandardsIgnoreStart
        "1" . 1 + 1; // This just happens to be a good example that throws a PHP version compatibility warning.
        // @codingStandardsIgnoreEnd

        // Make sure the following line is replaced before the scan
        // @codingStandardsIgnoreLine
        "1" . 1 + 1; // This just happens to be a good example that throws a PHP version compatibility warning.

        // Make sure the following line is replaced before the scan
        // phpcs:disable
        "1" . 1 + 1; // This just happens to be a good example that throws a PHP version compatibility warning.
        // phpcs:enable
    }
}