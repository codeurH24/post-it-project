#!/bin/bash
# apt install php-curl php-gd php-intl php-json php-mbstring php-xml php-zip
# apt-get install -y php8.0-common php8.0-fpm php8.0 php8.0-zip php8.0-soap php8.0-opcache php8.0-mysql php8.0-cli php8.0-gd php8.0-curl php8.0-xsl php8.0-imap php8.0-intl php8.0-sqlite3 php8.0-bcmath php8.0-mbstring php8.0-readline
cd /var/www/html
chmod -R 777 /var/www/html
composer install
chmod -R 777 /var/www/html
rm -r /var/cache/*
rm -r /var/log/*
echo "RUN SERVER BACK"
cd /var/www/html
php -S 0.0.0.0:8000 -t public
echo "FIN install.sh"