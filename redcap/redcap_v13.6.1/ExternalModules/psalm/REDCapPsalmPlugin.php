<?php namespace ExternalModules;

require_once __DIR__ . '/../classes/ScanConstants.php';

use Psalm\Issue\TaintedHeader;
use Psalm\Issue\TaintedSSRF;
use Psalm\Plugin\EventHandler\Event\BeforeAddIssueEvent;

class REDCapPsalmPlugin implements
    \Psalm\Plugin\EventHandler\AfterExpressionAnalysisInterface,
    \Psalm\Plugin\EventHandler\AfterFunctionCallAnalysisInterface,
    \Psalm\Plugin\EventHandler\AfterMethodCallAnalysisInterface,
    \Psalm\Plugin\EventHandler\BeforeAddIssueInterface
{
    public static function beforeAddIssue(BeforeAddIssueEvent $event): ?bool
    {
        $issue = $event->getIssue();

        if(is_a($issue, TaintedSSRF::class)){
            $items = ScanConstants::DB_TAINT_SOURCE_METHODS;
            $items[] = 'mysqli_result::';
            foreach($items as $item){
                // Psalm seems inconsistent on casing in some cases.  This ensures all cases match.
                $journey = strtolower($issue->journey_text);
                $item = strtolower($item);

                if(str_starts_with($journey, $item)){
                    /**
                     * A server-side request containing data from the database
                     * is an expected use case for REDCap.  Ignore this taint.
                     */
                    return false;
                }
            }
        }
        else if(is_a($issue, TaintedHeader::class)){
            foreach($issue->journey as $step){
                $location = $step['location'];
                if($location === null){
                    continue;
                }

                $text = strtolower(str_replace(' ', '', $location->getSelectedText()));
                if(str_contains($text, 'content-disposition:attachment')){
                    /**
                     * A tainted 'filename' is often included next in this header.
                     * This is considered a low risk expected use case, and should be ignored.
                     */
                    return false;
                }
            }
        }

        return null;
    }

    static function afterFunctionCallAnalysis(\Psalm\Plugin\EventHandler\Event\AfterFunctionCallAnalysisEvent $event): void{
        // var_dump($event->getFunctionId());
    }

    static function afterMethodCallAnalysis(\Psalm\Plugin\EventHandler\Event\AfterMethodCallAnalysisEvent $event): void{
        $methodId = $event->getMethodId();
        list($class, $methodName) = explode('::', $methodId);

        if($methodName === '__get'){
            return;
        }

        static::checkTaint($event, $class, $methodName);
    }

    static function afterExpressionAnalysis(\Psalm\Plugin\EventHandler\Event\AfterExpressionAnalysisEvent $event): ?bool{
        $expr = $event->getExpr();

        if(get_class($expr) === 'PhpParser\\Node\\Expr\\PropertyFetch'){
            $class = static::getVariableType($event, $expr->var);
            if($class !== null){
                static::checkTaint($event, $class, '$' . $expr->name->name);
            }
        }

        return null;
    }
    
    static function getVariableType($event, $v){
        if(isset($v->class)){
            return $v->class->getAttributes()['resolvedName'];
        }
        else if(isset($v->name) && gettype($v->name) === 'string'){
            $var = $event->getContext()->vars_in_scope['$' . $v->name] ?? null;
            if($var !== null){
                return $var->getId();
            }
        }

        /**
         * We don't currently support cases like this.
         * Scan Vizr and Multilingual for examples.
         */
        return null;
    }

    static function isTaintSource($class, $methodOrProperty){
        if($class === 'Project'){
            return true;
        }
        else if(
            $class === 'REDCap'
            &&
            $methodOrProperty === 'getdata'
        ){
            return true;
        }

        return false;
    }

    static function checkTaint($event, $class, $methodOrPropertyName){
        if(!static::isTaintSource($class, $methodOrPropertyName)){
            return;
        }

        $label = "$class::$methodOrPropertyName";
        $id = $label;
        if(!str_starts_with($methodOrPropertyName, '$')){
            /**
             * Method IDs must be made lower case for methods (but not properties).
             */
            $id = strtolower($id);
        }

        $event->getCodeBase()->taint_flow_graph->addSource(new \Psalm\Internal\DataFlow\TaintSource(
            $id,
            $label,
            null,
            null,
            \Psalm\Type\TaintKindGroup::ALL_INPUT,
        ));
    }
}