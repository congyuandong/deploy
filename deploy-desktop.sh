#!/bin/bash
WEB_PATH='/home/cyd/www/desktop'
WEB_USER='cyd'
WEB_USERGROUP='cyd'

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo "changing permissions..."
sh deploy restart
echo "Finished"