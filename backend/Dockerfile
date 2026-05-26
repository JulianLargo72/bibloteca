FROM php:8.2-apache

# Instalar extensiones de PHP necesarias
RUN docker-php-ext-install mysqli pdo pdo_mysql && \
    docker-php-ext-enable mysqli pdo_mysql

# Habilitar mod_rewrite
RUN a2enmod rewrite

# Instalar composer (opcional pero útil)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copiar código del backend
COPY backend/ /var/www/html/

# Cambiar el DocumentRoot a la carpeta public
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# Crear archivo .htaccess si no existe
RUN echo 'RewriteEngine On' > /var/www/html/public/.htaccess && \
    echo 'RewriteCond %{REQUEST_FILENAME} !-f' >> /var/www/html/public/.htaccess && \
    echo 'RewriteCond %{REQUEST_FILENAME} !-d' >> /var/www/html/public/.htaccess && \
    echo 'RewriteRule ^ index.php [L]' >> /var/www/html/public/.htaccess

# Dar permisos correctos
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]
