# Base image
FROM php:7.4

RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /app/news_aggregator_website_backend

COPY . .

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --ignore-platform-reqs

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0
