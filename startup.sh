#!/bin/bash
# basic bash to pre-setup nginx when deployed on heroku etc
# make sure line endings are LF only
node=`uname -n` # get current hostname (heroku hostnames are long)
length=${#node}
if [ $length -gt 16 ]
    then
        echo '[#####] long nodename - assuming heroku'
        envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template \
            > /etc/nginx/conf.d/default.conf
    else
        echo '[#####] short nodename - assuming not heroku'
fi
echo '[#####] starting nginx'

# last up, start nginx
exec nginx -g "daemon off;"
