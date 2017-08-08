#!/bin/sh

echo 'deploy e-jxapp'

#delete www.zip
rm -rf ./output/www.zip

#ces package
ces release -d publish

#copy to server
scp ./output/www.zip root@115.159.104.175:/root/www.zip

#connect to the sever
ssh root@115.159.104.175 > /dev/null 2>&1 << eeooff
rm -rf /root/jxapp/*
#move the war
mv /root/www.zip* /root/jxapp/www.zip
#unzip www.zip
cd /root/jxapp/
unzip www.zip
eeooff

echo 'deploy jxapp finish'
