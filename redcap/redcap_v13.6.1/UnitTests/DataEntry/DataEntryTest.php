<?php
use PHPUnit\Framework\TestCase;

class DataEntryTestTest extends TestCase
{
    public function testFormatVimeoUrl()
    {
        $vimeoUrl = 'https://vimeo.com/12345';
        $expected = ['0', 'https://player.vimeo.com/video/12345'];

        $this->assertEquals($expected, \DataEntry::formatVideoUrl($vimeoUrl));
    }

    public function testFormatYouTubeUrl()
    {
        $youtubeUrl = 'https://youtube.com/watch?v=abcdefg';
        $expected = ['0', 'https://www.youtube.com/embed/abcdefg?wmode=transparent&rel=0'];

        $this->assertEquals($expected, \DataEntry::formatVideoUrl($youtubeUrl));
    }

    public function testFormatInvalidUrl()
    {
        $invalidUrl = 'invalid url';
        $expected = ['1', ''];

        $this->assertEquals($expected, \DataEntry::formatVideoUrl($invalidUrl));
    }
}