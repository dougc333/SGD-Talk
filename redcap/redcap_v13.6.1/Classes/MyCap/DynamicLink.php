<?php

namespace Vanderbilt\REDCap\Classes\MyCap;

class DynamicLink {
    const DOMAIN = 'mycap.link';
    /** Prefix defined within Firebase console. Used to handle all
     * participant join project requests. */
    const URLPREFIX_JOIN = 'https://mycap.link/join';
    /** Prefix defined within Firebase console. Not currently used
     * for anything. Just a placeholder in case we need to handle
     * general dynamic link events in the future. */
    const URLPREFIX_OPEN = 'https://mycap.link/open';    
    /** The package name of the Android app to use to open the link. The 
     * app must be connected to your project from the Overview page of 
     * the Firebase console. Required for the Dynamic Link to open an 
     * Android app. */
    const APN = 'org.vumc.victr.mycap';
    /** The bundle ID of the iOS app to use to open the link. The app
     * must be connected to your project from the Overview page of the 
     * Firebase console. Required for the Dynamic Link to open an iOS 
     * app. */
    const IBI = 'org.vumc.mycap';
    /** Your app's App Store ID, used to send users to the App Store 
     * when the app isn't installed */
    const ISI = '1209842552';

    /**
     * Appends '&d=1', which tells Firebase to show the dynamic link
     * flowchart (debug mode). Intended for developer use only but
     * could be shown if needed.  
     * 
     * @param string $url 
     * @return string 
     */
    public static function makeFlowChartUrl($url) {
        return $url . '&d=1';
    }

    /**
     * Make a dynamic link allowing a participant to join a
     * MyCap project by tapping a link within a mobile device.
     * The https://mycap.link/join... URL will prompt 
     * participant to install the MyCap app OR open the MyCap
     * app if already installed IF participant is using a
     * mobile device. If participant is using a computer 
     * browser they will instead be redirected to a normal
     * HTML page https://mycap.link/join.html.
     * 
     * @param array $parameters
     * @return string 
     */
    public static function makeJoinUrl($parameters) {
        // Link to open if clicked from computer's browser. Also contains parameters for mobile app
        $link = urlencode('https://'.self::DOMAIN.'/join.html?' . http_build_query($parameters));
        return self::makeUrl(self::URLPREFIX_JOIN, $link);
    }

    /**
     * Makes the full dynamic link. Currently there is only the
     * "join" (project) dynamic link but there could be more in
     * the future.
     * 
     * @param string $prefix
     * @param string $link 
     * @return string 
     */
    public static function makeUrl($prefix, $link) {
        return sprintf(
            '%s/?apn=%s&isi=%s&ibi=%s&link=%s',
            $prefix,            
            self::APN,
            self::ISI,
            self::IBI,
            $link);
    }
}