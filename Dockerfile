# Use a base image with Docker installed
FROM docker:latest

# Install PHP and necessary extensions
RUN apk add --no-cache php php-cli php-json php-phar php-mbstring php-sockets

# Set the working directory
WORKDIR /usr/src/maboo

# Copy the PHP scripts into the container
COPY *.php .

# Start the PHP built-in server
CMD ["php", "-S", "0.0.0.0:80", "-t", "/usr/src/maboo"]