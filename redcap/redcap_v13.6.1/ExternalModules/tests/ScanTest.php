<?php namespace ExternalModules;

require_once APP_PATH_EXTMOD . 'classes/Scan.php';
require_once APP_PATH_EXTMOD . 'classes/ScanConstants.php';
require_once __DIR__ . '/phpcs-shared/SniffMessages.php';

/**
 * @group slow
 */
class ScanTest extends BaseTest
{
   const PHP_TEMP_FILE_NAME = 'scan-test-temp-file.php';
   const VUE_TEMP_FILE_NAME = 'scan-test-temp-file.vue';
   const JS_TEMP_FILE_NAME = 'scan-test-temp-file.js';

   static $output;
   static $actualTaints = [];
   static $actualJavaScriptFileErrors = [];
   static $actualPHPCSErrors = [];
   static $systemPageHookWarning;
   static $systemEmailHookWarning;
   static $composerPHPVersionError;

   static function setUpBeforeClass(): void{
      parent::setUpBeforeClass();
      static::setOutput();
   }

   function setUp(): void{
      if(static::areTestsSkipped()){
         $this->markTestSkipped();
         return;
      }

      parent::setUp();
   }

   private static function areTestsSkipped(){
      $parts = explode(':\\', __DIR__);
      if(PHP_OS_FAMILY === 'Windows' && $parts[0] !== 'C' && str_starts_with($parts[1], 'home\\')){
         throw new \Exception("
            You appear to be running Windows PHP against a WSL filesystem, which is not currently supported.
            Please either run Windows PHP against a Windows filesystem, or temporarily comment out this Exception
            in order to skip this test.
         ");

         return true;
      }

      return false;
   }

   private static function setOutput(){
      if(static::areTestsSkipped()){
         return;
      }

      $scanTestPHPTempFile = __DIR__ . '/test-module/' . static::PHP_TEMP_FILE_NAME;
      file_put_contents($scanTestPHPTempFile, '
         <script>
            eval // Make sure JS in PHP files is scanned
         </script>
         <?php
         $phpCompatibilityExample = "1" . 1 + 1;

         const SOME_CONST;
         function someFunction();
         class SomeClass;
      ');

      $scanTestEmptyPHPTempFile = __DIR__ . '/test-module/scan-test-empty-temp-file.php';
      file_put_contents($scanTestEmptyPHPTempFile, '');

      $scanTestVueTempFile = __DIR__ . '/test-module/' . static::VUE_TEMP_FILE_NAME;
      file_put_contents($scanTestVueTempFile, '
         <script>
            eval(someInjectableVar)
         </script>
      ');

      $scanTestJSTempFile = __DIR__ . '/test-module/' . static::JS_TEMP_FILE_NAME;
      // The following lines should produce the same result in EvalInJavascriptSniff and eslint (with /*eslint no-eval: "error"*/ set)
      file_put_contents($scanTestJSTempFile, '
         // Should show errors
         eval
         someFunction(eval(someVar))
         ""+eval
         window["eval"]
window[\'eval\'] // Tests lack of leading indentation as well

         // Should NOT show errors
         .eval
         eval.
         someObject["eval"]
         medieval
         evaluation
         string.match(/foo-eval/)
         string.match(/foo|eval/)
         string.match(/eval-foo/)
         string.match(/eval|foo/)
         // eval
         /**
          * eval
          */
         eval("require")
         (0, eval)("this")
         ;{
            \'%eval%\': eval,
            "%eval%": eval,
         }
      ');

      [$lines, $result] = static::scan('tests/test-module');
      unlink($scanTestPHPTempFile);
      unlink($scanTestEmptyPHPTempFile);
      unlink($scanTestVueTempFile);
      unlink($scanTestJSTempFile);

      static::$output = implode("\n", $lines);
      static::assertSame(1, $result, 'Scan failed with output: ' . implode("\n", $lines));

      $currentTaint = null;
      $lastLine = null;
      $saveTaint = function() use (&$currentTaint, &$lastLine){
         // Replace ansi color codes that prevent simple string matching
         $lastLine = str_replace('[30;47m', '', $lastLine);

         $parts = explode("'", $lastLine);
         if(count($parts) === 3){
            $label = $parts[1];
         }
         else if(preg_match_all('/([a-zA-Z_:]+)\(/', $lastLine, $matches)){
            $label = end($matches[1]);
         }
         else{
            $label = $lastLine;
         }
         
         $label = trim(str_replace('[0m', '', $label));

         static::$actualTaints[$label][] = $currentTaint;
      };

      $currentPHPCSFile = null;
      foreach($lines as $line){
         if(str_starts_with($line, '[0;31mERROR[0m: ')){
            if(str_starts_with($line, "[0;31mERROR[0m: A platform PHP version should be set in composer.json")){
               static::$composerPHPVersionError = true;
            }
            else{
               if($currentTaint !== null){
                  $saveTaint();
               }

               $currentTaint = explode(' ', $line)[1];
            }
         }
         else if($currentTaint !== null){
            if(str_starts_with($line, '---')){
               // We've reached the end of Psalm's output
               $saveTaint();
               $currentTaint = null;
            }
            else if(!empty(trim($line))){
               $lastLine = $line;
            }
         }
         else if(str_starts_with($line, "[0;31mWARNING[0m: The 'enable-every-page-hooks-on-system-pages' flag")){
            static::$systemPageHookWarning = true;
         }
         else if(str_starts_with($line, "[0;31mWARNING[0m: The 'enable-email-hook-in-system-contexts' flag")){
            static::$systemEmailHookWarning = true;
         }
         else if(str_ends_with($line, SniffMessages::JS_EVAL)){
            static::$actualJavaScriptFileErrors[] = $line;
         }
         else if(str_starts_with($line, 'FILE: ')){
            $currentPHPCSFile = basename(explode('FILE: ', $line)[1]);
         }
         else{
            $parts = explode(' | ', $line);
            if(in_array($parts[1] ?? '', ['WARNING', 'ERROR'])){
               // Assume this is a phpcs error
               $lineNumber = trim($parts[0]);
               static::$actualPHPCSErrors[$currentPHPCSFile][$lineNumber] = $parts[2];
            }
         }
      }
   }

   private static function scan($args){
      exec('php ' . __DIR__ . "/../bin/scan.php $args 2>&1", $lines, $result);
      return [$lines, $result];
   }

   function testIgnoredCasesAndNoAuthConfigWarnings(){
      /**
       * This foreach is not currently necessary, but will become necessary to ensure
       * clean scans if additional example modules are ever added.
       */
      foreach(glob(__DIR__ . "/../example_modules/*") as $exampleModuleDir){
         $emptyFile = "$exampleModuleDir/empty-file.php";
         $fileWithIgnoreIssuesPath = "$exampleModuleDir/file-with-ignore-scan-issues.php";

         file_put_contents($emptyFile, '');
         file_put_contents($fileWithIgnoreIssuesPath, '
            <?php namespace Test;
            /**
             * These lines would normally cause PHPCompatibility sniffs, but we exclude them in the "phpcs" command.
             * This test assures that they do not trigger errors.
             */
            class Test{
               function someFunction($arg){
                  $arg = "whatever";
                  debug_backtrace();
                  $this->$arg[] = 1;
                  Whatever::cpdf();
               }
            }
         ');

         $this->assertScanResult($exampleModuleDir, "
            [0;31mWARNING[0m: The 'enable-no-auth-logging' flag is set to 'true' in config.json.
            If logging is not required for unauthenticated users, please remove this flag from config.json.
            If this flag is required, please review changes since the last scan that could influence unauthenticated log behavior.
            To minimize risk of exploitation, please use hard coded strings or allow lists for logged variables wherever possible.
            If any logged values must be sourced from request variables, please ensure that a malicious actor cannot use those values
            to compromise security or adversely influence module behavior in any way.
            Please review both PHP and JavaScript log() calls.

            [0;31mWARNING[0m: The 'no-auth-ajax-actions' flag is set to 'true' in config.json.
            If the JavaScript module.ajax() method is not required for unauthenticated users, please remove this flag from config.json.
            If this flag is required, please review changes since the last scan that could influence unauthenticated ajax() call behavior.
            To minimize risk of exploitation, please use hard coded strings or allow lists for the ajax data/payload wherever possible.
            If any portion of the data/payload must be sourced from request variables, please ensure that a malicious actor cannot use that data
            to compromise security or adversely influence module behavior in any way.
         ");

         unlink($emptyFile);
         unlink($fileWithIgnoreIssuesPath);
      }
   }

   private function assertScanResult($exampleModuleDir, $expectedOutput){
      $expected = trim(Scan::formatMessage($expectedOutput) . "\n" . Scan::formatMessage("
         ---------------------------------------------------------------------------------------------
         
         Please review the results above, consider any WARNINGs, and address any ERRORs.
         Solutions to ERRORs should also be applied in comparable scenarios throughout the codebase,
         as this scan is not capable of finding all potential vulnerabilities.
         If you encounter false positives, or have any other difficulties running scans,
         please reach out to Mark McEver via mark.mcever@vumc.org or community.projectredcap.org.
      "));

      if(version_compare(PHP_VERSION, '7.4', '<')){
         $expected = "[0;31mWARNING[0m: It is recommended to run this tool on PHP 7.4 or newer to find the most potential vulnerabilities, and avoid the most false positives.\n\n\n$expected";
		}

      [$lines, $result] = $this->scan($exampleModuleDir);

      // This block be removed once these errors are fixed in REDCap core.
      $lines = array_filter($lines, function($line){
         if(str_starts_with($line, 'Error message: Deprecated')){
            echo "$line\n";
            return false;
         }

         return true;
      });

      $this->assertSame($result, 1);
      $this->assertSame($expected, trim(implode("\n", $lines)));
   }

   function testRegularOutput(){
      // Disabled for now.
      $this->expectNotToPerformAssertions();
      return;

      $actual = [];
      foreach($this->getOutput()['regular'] as $item){
         $count =& $actual[$item['message']];
         $count++;
      }

      $this->assertSame([
         'Too few arguments for method ExternalModules\AbstractExternalModule::query saw 0' => 6,
      ], $actual);
   }

   function testTaintAnalysisOutput(){
      $expected = [];

      $addExpected = function($expectedTaintTypes, $paramNames) use (&$expected){
         if(!is_array($expectedTaintTypes)){
            $expectedTaintTypes = [$expectedTaintTypes];
         }
   
         foreach($paramNames as $paramName){
            foreach($expectedTaintTypes as $type){
               $expected[$paramName][] = $type;
            }
         }
      };

      $queryArgs = [
         'db_query',
         'mysqli_query',
         'mysqli::query',
         'query 1',
         'query 2',
         'query 3',
         'Query::add() 1',
         'Query::add() 2',
         'queryData 1',
         'queryData 2',
         'queryData 3',
         'queryData 4',
         'query in module page',
         'queryLogs 1',
         'queryLogs 2',
      ];

      $dbTaintSources = ScanConstants::DB_TAINT_SOURCE_METHODS;
      if(version_compare(PHP_VERSION, '7.4', '<')){
         unset($dbTaintSources[0]);
      }

      $addExpected(['TaintedHtml', 'TaintedTextWithQuotes'], array_merge($queryArgs, $dbTaintSources, [
         'direct-echo',
         'return',
         'fetch_all',
         'fetch_array',
         'fetch_assoc',
         'fetch_column',
         // 'fetch_object', // TODO - Once this case is fixed in newer psalm versions, uncomment this and remove the 'fetch_object' string from the PHP_VERSION block below.
         'fetch_row',
      ]));

      if(version_compare(PHP_VERSION, '7.4', '<')){
         $addExpected(['TaintedHtml', 'TaintedTextWithQuotes'], ['fetch_object']);
         $addExpected(['TaintedSSRF'], ['whatever', 'db_fetch_assoc']);
         $addExpected(['TaintedHeader'], ['header']);
      }

      $addExpected('TaintedSql', array_merge($queryArgs, [
         'getQueryLogsSql 1',
         'getQueryLogsSql 2',
      ]));

      if(version_compare(PHP_VERSION, '7.4', '>=')){
         $addExpected(['TaintedHtml', 'TaintedTextWithQuotes'], [
            'echo $project->metadata;',
            'echo (new \Project)->metadata;',
            'getGroups',
            'eventsToCSV',
            'Project::getDataEntry',
         ]);
      }

      foreach($expected as $key=>&$child){
         sort($child);
      }

      foreach(static::$actualTaints as $key=>&$child){
         sort($child);
      }

      $this->assertEquals($expected, static::$actualTaints);
   }

   function testWarnings(){
      $this->assertTrue(static::$systemPageHookWarning);
      $this->assertTrue(static::$systemEmailHookWarning);
      $this->assertTrue(static::$composerPHPVersionError);
   }

   function testJavaScriptFiles(){
      $expected = [];
      foreach([3,4,5,6,7] as $lineNumber){
         $expected[] = static::JS_TEMP_FILE_NAME . ":$lineNumber - " . SniffMessages::JS_EVAL;
      }

      $this->assertSame($expected, static::$actualJavaScriptFileErrors);
   }

   function testPHPCS(){
      $expectedPHPCSErrors = [];

      $expectedPHPCSErrors['TestModule.php'] = [
         11 => 'The function fpm_get_status() is not present in PH',
         122 => 'A @psalm-taint-escape attribute was found.  If this',
         129 => 'Using an unparenthesized expression containing a "',
         134 => 'Using an unparenthesized expression containing a "',
         138 => 'Using an unparenthesized expression containing a "',
      ];

      $expectedPHPCSErrors[static::PHP_TEMP_FILE_NAME] = [
         3 => SniffMessages::JS_EVAL,
         6 => 'Using an unparenthesized expression containing a "." before a "+" or "-" has been deprecated in PHP 7.4 and removed in PHP 8.0'
      ];

      foreach([8,9,10] as $lineNumber){
         $expectedPHPCSErrors[static::PHP_TEMP_FILE_NAME][$lineNumber] = SniffMessages::MISSING_NAMESPACE;
      }

      $expectedPHPCSErrors[static::VUE_TEMP_FILE_NAME] = [
         3 => SniffMessages::JS_EVAL
      ];

      foreach([
         &$expectedPHPCSErrors,
         &static::$actualPHPCSErrors
      ] as &$linesByFilename){
         foreach($linesByFilename as &$errorsByLine){
            foreach($errorsByLine as $line => $error){
               /**
                * In larger terminals, PHPCS output is wrapped differently.
                * It stops wrapping past a point when the terminal gets too small.
                * The following limit should ensure that this test passes regardless of terminal window width.
                */
                $errorsByLine[$line] = substr($error, 0, 50);
            }
         }
      }

      // We've seen PHPCS scan files in different orders on different systems.
      ksort($expectedPHPCSErrors);
      ksort(static::$actualPHPCSErrors);

      $this->assertSame($expectedPHPCSErrors, static::$actualPHPCSErrors);
   }

   function testCheckComposerConfig(){
      $s = new Scan();
      $targetPHPVersion = Scan::TARGET_PHP_VERSION;
      
      $getRelativeVersion = function($offset) use ($targetPHPVersion){
         $parts = explode('.', $targetPHPVersion);

         for($i=count($parts)-1; $i>=0; $i--){
            $part = $parts[$i];
            if($offset < 0 && $part === '0'){
               continue;
            }

            $parts[$i] = $part+$offset;
         }

         return implode('.', $parts);
      };

      $assertOutput = function($expectedOutput) use ($s){
         $this->assertOutput(function() use ($s){
            $s->checkComposerConfig();
         }, $expectedOutput);
      };

      $assert = function($composerMinVersion, $moduleMinVersion, $expectedOutput) use ($s, $getRelativeVersion, $assertOutput){
         $config = [];
         if($moduleMinVersion !== null){
            $config['compatibility']['php-version-min'] = $getRelativeVersion($moduleMinVersion);
         }
         $s->setConfig($config);

         $s->setComposerConfig([]);
         $assertOutput('');
         
         $composerConfig = ["name" => "what/ever"];
         if($composerMinVersion !== null){
            $composerConfig['config']['platform']['php'] = $getRelativeVersion($composerMinVersion);
         }
         $s->setComposerConfig($composerConfig);

         if($expectedOutput !== ''){
            $expectedOutput = "[0;31mERROR[0m: " . $expectedOutput;
         }

         $assertOutput($expectedOutput);
      };

      $assert(null, null, $s->getComposerVersionMissingMessage($targetPHPVersion, null, true));
      $assert(null, -1, $s->getComposerVersionMissingMessage($targetPHPVersion, null, true));
      $assert(null, 1, $s->getComposerVersionMissingMessage($getRelativeVersion(1), 'your module'));
      $assert(1, null, $s->getComposerHigherThanModulePHPVersionMessage());
      $assert(0, null, '');
      $assert(0, -1, '');
      $assert(0, 0, '');
      $assert(0, 1, '');
      $assert(1, 1, '');
      $assert(2, 1, $s->getComposerHigherThanModulePHPVersionMessage());
   }

   protected function tearDown(): void{
      $failureOutputPath = __DIR__ . '/ScanTest_failure-output.txt';

      if ($this->getStatus() === \PHPUnit\Runner\BaseTestRunner::STATUS_PASSED){
         if(file_exists($failureOutputPath)){
            unlink($failureOutputPath);
         }
      }
      else{
         // Write scan script output to a file on failure, for easy troubleshooting.
         file_put_contents($failureOutputPath, static::$output);
      }
  }
}