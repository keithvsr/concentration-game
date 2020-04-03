FROM nginx:alpine

COPY html /usr/share/nginx/html

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

COPY new_wrapper.sh /

# Need Bash for alpine
RUN apk add --no-cache bash

# move commands to one shell file rather than individual RUN instances
CMD ["./startup.sh"]
