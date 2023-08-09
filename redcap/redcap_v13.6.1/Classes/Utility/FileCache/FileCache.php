<?php
namespace Vanderbilt\REDCap\Classes\Utility\FileCache;

use SplFileObject;

class FileCache
{
    const VERSION = '1.0.0';
    const DEFAULT_TTL = 900;
    const FILE_EXTENSION = 'cache';

    /**
     * use a namespace for better organization
     * of cached data
     *
     * @var string
     */
    private $namespace;

    /**
     * path to the directory
     * where cache files will be stored
     *
     * @var string
     */
    private $cacheDir;

    /**
     * optional visitor function that can modify the name
     * of the cache file
     *
     * @var NameVisitorInterface
     * @return [$filename, $extension]
     */
    private $fileNameVisitor;

    public function __construct($namespace='', $cacheDir=null, $fileNameVisitor=null)
    {
        if(is_null($cacheDir) && defined('APP_PATH_TEMP')) $cacheDir = APP_PATH_TEMP;
        if(!file_exists($cacheDir) || !is_dir($cacheDir)) {
            $cacheDir = sys_get_temp_dir();
        }
        $this->namespace = $namespace;
        $this->cacheDir = realpath($cacheDir);
        $this->fileNameVisitor = $fileNameVisitor;
    }

    /**
     * get the name and path of the file
     * where the key is stored
     *
     * @param string $key
     * @return string
     */
    private function getFilePath($key)
    {
        $filename = $this->getFileName($key);
        $path = $this->cacheDir.DIRECTORY_SEPARATOR.$filename;
        return $path;
    }

    /**
     * get the normalized file name for a specific key
     *
     * @param string $key
     * @return string
     */
    public function getFileName($key) {
        $hashedFilename = md5(self::VERSION.$this->namespace.$key);
        $extension = self::FILE_EXTENSION;
        if($this->fileNameVisitor instanceof NameVisitorInterface) {
            list($hashedFilename, $extension) = call_user_func_array([$this->fileNameVisitor, 'visit'], [$key, $hashedFilename, $extension]);
        }
        return sprintf("%s.%s", $hashedFilename, $extension);
    }

    public function delete($key)
    {
        $filename = $this->getFilePath($key);
        if(!file_exists($filename)) return;
        return unlink($filename);
    }

    /**
     * cache a file with a specific key
     * in the current namespace.
     * overwrite existing files
     *
     * @param string $key
     * @param mixed $data
     * @param int $ttl seconds to live (default to 15 minutes)
     * @return void
     */
    function set($key, $data, $ttl=self::DEFAULT_TTL)
    {
        $mode = 'w+';
        $this->write($mode, $key, $data, $ttl);
    }

    /**
     * cache a file with a specific key
     * in the current namespace.
     * append to existing file or create it.
     *
     * @param string $key
     * @param mixed $data
     * @param int $ttl seconds to live (default to 15 minutes)
     * @return void
     */
    function append($key, $data, $ttl=self::DEFAULT_TTL)
    {
        $mode = 'a+';
        $this->write($mode, $key, $data, $ttl);
    }

    private function write($mode, $key, $data, $ttl)
    {
        try {
            $filePath = $this->getFilePath($key);
            $file = new SplFileObject($filePath, $mode);
            $locked = $file->flock(LOCK_EX); // do an exclusive lock
            if(!$locked) throw new \Exception('Could not write to cache');
            $totalBytes = $file->fwrite($data);
            if($totalBytes===false) throw new \Exception('Could not write to cache');
            // set lifetime
            $lifespan = time()+$ttl;
            touch($filePath, $lifespan); // set the modification time of the file to its lifespan
        } catch (\Throwable $th) {
            throw $th;
        }finally {
            $file->flock(LOCK_UN);   // release the lock
        }
    }

    /**
     * check if a key exists
     *
     * @param string $key
     * @return boolean
     */
    public function has($key)
    {
        $filePath = $this->getFileForReading($key);
        return($filePath!==false);
    }

    /**
     * get a cached file with a specific key
     * in the current namespace.
     * do not return if the value has expired
     *
     * @param string $key
     * @return mixed
     */
    public function get($key)
    {
        $filePath = $this->getFileForReading($key);
        if($filePath===false) return;
        $data = file_get_contents($filePath);
        return $data;
    }

    public function getLine($key, $line=0)
    {
        $filePath = $this->getFileForReading($key);
        if($filePath===false) return;
        $file = new SplFileObject($filePath, $mode='r');
        $file->fseek($line);
        $line = $file->fgets();
        return $line;
    }

    /**
     * cache a file with a specific key
     * in the current namespace.
     * append a new line of data to existing file or create it.
     *
     * @param string $key
     * @param mixed $data
     * @param int $ttl seconds to live (default to 15 minutes)
     * @return void
     */
    function appendLine($key, $data, $ttl=self::DEFAULT_TTL) { return $this->append($key, $data.PHP_EOL , $ttl); }


    public function getFileForReading($key) {
        $filePath = $this->getFilePath($key);
        if (!file_exists($filePath) || !is_readable($filePath)) return false;
        $ttl = $this->getSystemFileModificationTime($filePath);
        if ((time() > $ttl)) {
            $this->delete($key);
            return false;
        }
        return $filePath;
    }

    /**
     * get the system modification time;
     * this could be used instead of storing the time
     * inside the cache
     *
     * @param string $filePath
     * @return int
     */
    private function getSystemFileModificationTime($filePath)
    {
        clearstatcache(true, $filePath);
        $modificatioTime = filemtime($filePath);
        return $modificatioTime;
    }

 }