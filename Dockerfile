FROM nginx:alpine

COPY html /usr/share/nginx/html

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

COPY new_wrapper.sh /

# Need Bash for Alpine (duh)
RUN apk add --no-cache bash

# Heroku-ify the port
# CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template \
    # > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
    


# RUN cat /etc/nginx/conf.d/default.conf | grep 'listen'

# RUN uname -n

# RUN echo "Nginx is running... on '\$PORT'"

# Trying to move commands to one shell file rather than start all these
CMD ["./new_wrapper.sh"]
