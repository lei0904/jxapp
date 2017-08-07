#!/bin/sh

echo 'deploy e-drive'

#maven package
mvn clean package -P product

#copy to server
scp ./target/e-drive.war root@115.159.104.175:/root/e-drive.war

#connect to the sever
ssh root@115.159.104.175 > /dev/null 2>&1 << eeooff
#kill tomcat
kill -9 `ps -ef | grep "apache-tomcat-8.5.16" | grep -v "grep" | awk '{print $2}'`
#bak ueditor
mv /root/apache-tomcat-8.5.16/webapps/ROOT/ueditor /root/data
rm -rf /root/apache-tomcat-8.5.16/webapps/*
#move the war
mv /root/e-drive.war* /root/apache-tomcat-8.5.16/webapps/ROOT.war
#tomcat start up
sh /root/apache-tomcat-8.5.16/bin/startup.sh
#mv ueditor
mv /root/data/ueditor /root/apache-tomcat-8.5.16/webapps/ROOT
eeooff

echo 'deploy e-drive finish'
