FROM nginx:alpine

COPY html /usr/share/nginx/html

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

# Heroku-ify the port
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template \
    > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;' \
    && cat /etc/nginx/conf.d/default.conf.template | grep 'listen'

# RUN echo "Nginx is running... on '\$PORT'"
