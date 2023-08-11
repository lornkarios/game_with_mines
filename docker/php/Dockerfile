FROM php:8.2-fpm
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN apt-get update \
    && apt-get install -y \
        git \
        curl \
        nano \
        zip \
        unzip \
    && rm -rf /var/lib/apt/lists

RUN if [ "$XDEBUG_FLAG" = "true" ]; \
        then \
            pecl install xdebug && docker-php-ext-enable xdebug; \
    fi

COPY ./app /app

WORKDIR /app

RUN chmod 766 /etc/passwd
ENV USER=default
ENV UID=1000
ENV GID=82

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "$(pwd)" \
    --ingroup "www-data" \
    --no-create-home \
    --uid "$UID" \
    "$USER"

CMD ["php-fpm"]