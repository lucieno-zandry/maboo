# Stage 1: Composer
FROM composer:latest AS composer

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install --no-dev --no-scripts --no-interaction --prefer-dist

# Stage 2: PHP with Ratchet
FROM php:8.2-alpine

WORKDIR /websocket

COPY --from=composer /app/vendor /websocket/vendor
COPY --from=composer /app/composer.json /websocket/composer.json
COPY --from=composer /app/composer.lock /websocket/composer.lock

COPY . .

EXPOSE 9000

CMD ["php", "server.php"]
