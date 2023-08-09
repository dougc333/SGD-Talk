<?php
use PHPUnit\Framework\TestCase;

class EventFormTest extends TestCase
{
//	protected function setUp()
//	{
//		db_connect(false);
//	}

	public static function create($event_id, $form_name)
	{
		$sql = "
			INSERT INTO redcap_events_forms (
				event_id, form_name
			) VALUES (
				$event_id, '$form_name'
			)
		";
		$q = db_query($sql);
		return ($q && $q !== false) ? db_affected_rows() : 0;
	}

	// tests
	
	public function testAdd()
	{
		$this->markTestIncomplete();
		return;
		
		$count = rowCount('redcap_events_forms');

		$project_id = ProjectTest::getTestProjectID1();

		$arm_id = ArmTest::create($project_id, 2);
		$event_id = EventTest::create($arm_id);
		EventFormTest::create($event_id, hashStr());

		$this->assertGreaterThan($count, rowCount('redcap_events_forms'));
	}

}
