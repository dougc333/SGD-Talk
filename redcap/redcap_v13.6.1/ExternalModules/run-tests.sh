#!/bin/sh

set -e

if [ `git name-rev --name-only --tags HEAD` != 'undefined' ] ; then
    echo "Skipping tests since a tag is checked out.  We assume this is a release tag, and we are running the deploy script to quickly rollback to a previous deployment."
    exit
fi

composer install -q
npm install > /dev/null

phpunitPath=`php bin/get-phpunit-path.php`

# php -dxdebug.mode=debug -dxdebug.client_host=127.0.0.1 -dxdebug.client_port=9003 -dxdebug.start_with_request=yes `php bin/get-phpunit-path.php`
php $phpunitPath

echo
echo "Running REDCap Core's unit tests, since we don't currently have an automated way of running them elsewhere..."
redcapVersionPath=$phpunitPath
for i in 1 2 3 4 5; do
    redcapVersionPath=`dirname $redcapVersionPath`
done
cd $redcapVersionPath

grep ExternalModules::getTestPIDs UnitTests/Project/ProjectTest.php > /dev/null || unsafeREDCapCommit=1
if [ $unsafeREDCapCommit ] ; then
    echo "REDCap Core tests are not safe in this REDCap Core version!!!"
    exit
fi

php $phpunitPath
cd - > /dev/null

echo
echo Checking code standards...
minPhpVersion=`php bin/get-min-php-version.php`;
vendor/bin/phpcs -ps --runtime-set testVersion $minPhpVersion- --standard=tests/phpcs-framework,tests/phpcs-shared,vendor/phpcompatibility/php-compatibility/PHPCompatibility --extensions=php --ignore=/vendor,/node_modules .

# We get intermittent constant not found errors if we don't clear the cache first...
vendor/bin/psalm --clear-cache

echo "Running Psalm (the normal scan must succeed to guarantee that all code can be traversed for the taint analysis)"
vendor/bin/psalm 2>&1

echo "Running Psalm's Taint Analysis "
vendor/bin/psalm --taint-analysis 2>&1

echo Ensuring JavaScript browser compatibility...
node_modules/.bin/eslint .
echo

echo 'All tests completed successfully!'
echo
