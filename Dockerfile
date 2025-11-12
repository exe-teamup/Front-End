# Stage: Serve prebuilt frontend using Nginx
FROM nginx:alpine

# Copy built files from dist
COPY dist /usr/share/nginx/html

# Add basic SPA routing config
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri /index.html; } \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80 for Docker
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
