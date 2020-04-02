FROM nginx

COPY code /usr/share/nginx/html

RUN echo "Nginx is running..."