FROM nginx

COPY html /usr/share/nginx/html

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

RUN echo "Nginx is running... on $PORT"

# Heroku-ify the port
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template \
    > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'