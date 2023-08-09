<?php namespace ExternalModules;

class SniffMessages{
    const JS_EVAL = "Please avoid the javascript eval() function. It is not currently possible to ensure its safety via automated scanning.";
    const MISSING_NAMESPACE = "Function, class, and const definitions are only allowed in namespaced PHP files to avoid conflicts between modules and/or REDCap core.  Please add use statements or backslashes for all references to classes in the global space (search for 'new' and '::'), then add a namespace at the top of this file (perhaps the same namespace as your module class).";

    static function doesLineContainJSEval($line){
        // Also match basic window['eval'] reverences like eslint does
        if(preg_match('/window\[[\'"]eval[\'"]\]/', $line)){
            return true;
        }

        /**
         * A false positive edge case in pdf.js
         */
        $line = str_replace('eval("require")', '', $line);

        /**
         * A false positive edge case in https://github.com/almende/vis/blob/master/dist/vis.js
         */
        $line = str_replace('eval)', '', $line);

        /**
         * A false positive edge case in https://github.com/dr01d3r/redcap-em-biospecimen-tracking/releases/download/v0.9.2-beta/biospecimen_tracking_v0.9.2.zip
         */
        $line = str_replace("'%eval%': eval", '', $line);
        $line = str_replace('"%eval%": eval', '', $line); // And a variant of it

        $line = trim(static::clearQuotedSubStrings($line));
        if(preg_match('/\beval\b/', $line, $matches, PREG_OFFSET_CAPTURE)){
            if(
                str_starts_with($line, '//')
                ||
                str_starts_with($line, '*')
            ){
                // This is most likely a comment.
                return false;
            }

            $allowedAdjacentChars = ['.', '-', '|'];
            foreach($matches as $match){
                $i = $match[1];
                $previousChar = $line[$i-1] ?? '';
                $nextChar = $line[$i+4] ?? '';
                if(
                    !in_array($previousChar, $allowedAdjacentChars)
                    &&
                    !in_array($nextChar, $allowedAdjacentChars)
                ){
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Copied from REDCap's System::clearQuotedSubStrings()
     */
    private static function clearQuotedSubStrings($s){
		$newS = '';
	
		$lastC = null;
		$quoteType = null;
		for($i=0; $i<strlen($s); $i++){
			$c = $s[$i];
			
			if($quoteType === null){
				if(in_array($c, ['"', "'"])){
					$quoteType = $c;
				}

				$newS .= $c;
			}
			else if($c === $quoteType && $lastC !== '\\'){
				$quoteType = null;
				$newS .= $c;
			}
	
			$lastC = $c;
		}

		return $newS;
	}
}