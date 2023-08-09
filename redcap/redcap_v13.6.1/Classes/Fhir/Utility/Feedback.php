<?php
namespace Vanderbilt\REDCap\Classes\Fhir\Utility;

use DateTime;
use Messenger;

class Feedback
{

  private $project_id;
  private $title;
  /**
   * recipients
   *
   * @var array
   */
  private $user_ids;

  /**
   *
   * @param int $project_id
   * @param string $channel_name
   * @param array $user_ids user IDs of the recipients
   */
  public function __construct($project_id, $channel_name, $user_ids=[]) {
    $this->project_id = $project_id;
    $this->setTitle($channel_name);
    $this->setUserIds($user_ids);
  }

  /**
   * set the title using invisible decorators so it is harder
   * to match a user generated channel name
   *
   * @param string $channel_name
   * @return void
   */
  protected function setTitle($channel_name) {
    // $unitSeparator = chr(31);
    $this->title = $channel_name;
  }

  public function setUserIds($user_ids) {
    if(!empty($user_ids) && !is_array( $user_ids)) $user_ids = [$user_ids];
    $user_ids = array_filter($user_ids, function($user_id) { return isinteger($user_id); }); // make sure all user_ids are integers
    $this->user_ids = $user_ids;
  }

  /**
   *
   * @param string $message
   * @param string $from alphanumeric username
   * @return int ID of the created thread
   */
  public function send($message, $from) {
    if(empty($this->user_ids)) return;
    
    if(!defined('USERID') && !defined("CRON")) define('USERID', $from); // needed by Messenger::createNewConversation
    $usernames = array_map(function($user_id) {
      $userInfo = \User::getUserInfoByUiid($user_id);
      $username = @$userInfo['username'];
      return $username;
    }, $this->user_ids);

    $to = implode(', ', $usernames);
    return Messenger::createNewConversation($this->title, $message, $from, $to, $this->project_id);
  }

  /**
   * check if a message was recently sent by the token manager
   *
   * @return bool
   */
  public function wasSentRecently($delayInSeconds) {
      $now = time();
      $previousMessageDate = $this->getPreviousMessageDate();
      if(! ($previousMessageDate instanceof DateTime) ) return false;
      $previousTimestamp = $previousMessageDate->getTimestamp();
      $elapsedTime = $now-$previousTimestamp;
      return $elapsedTime < $delayInSeconds;
  }


  private function getPreviousMessages() {
    if(empty($this->user_ids)) $userIdsClause = '';
    else $userIdsClause = sprintf(' AND recipients.recipient_user_id IN (%s)', implode($this->user_ids));

    $query_string = sprintf(
      "SELECT threads.thread_id, project_id, channel_name, recipients.recipient_user_id, sent_time
      FROM redcap_messages_threads AS threads
      LEFT JOIN redcap_messages AS messages ON threads.thread_id=messages.thread_id
      LEFT JOIN redcap_messages_recipients AS recipients ON threads.thread_id=recipients.thread_id
      LEFT JOIN redcap_messages_status AS status ON messages.message_id=status.message_id
      WHERE project_id=%u AND channel_name LIKE %s %s
      ORDER BY sent_time DESC",
      intval($this->project_id), checkNull("{$this->title}%"), $userIdsClause
    );
    $result = db_query($query_string);
    return $result;
  }

  /**
   * get the date of the last message sent by the token manager
   *
   * @return DateTime|false
   */
  public function getPreviousMessageDate()
  {
      $result = $this->getPreviousMessages();
      if( $result && ($row = db_fetch_assoc($result)) ) return date_create_from_format('Y-m-d H:i:s', @$row['sent_time']);
      return false;
  }

    /**
     * delete existing message's threads
     * to avoid flooding the system.
     * the very last message will NOT be deleted,
     * otherwise the system will keep sending emails:
     * REDCap checks for existing messages and applies the digest settings in the user's profile
     *
     * @return mysqli_result
     */
    public function deletePreviousMessages() {
      $result = $this->getPreviousMessages();
      $threads = [];
      while($row = db_fetch_assoc($result)) $threads[] = intval(@$row['thread_id']);
      array_shift($threads); // remove the most recent message from the list
      if(empty($threads)) return;

      $query_string = sprintf(
          "DELETE FROM redcap_messages_threads WHERE project_id = %u AND thread_id IN (%s)",
          intval($this->project_id), implode(', ', $threads)
      );
      return db_query($query_string);
  }

 }