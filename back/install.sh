#!/bin/bash
echo "START install.sh"
cd /var/www/html
chmod -R 777 /var/www/html
echo "COMPOSER INSTALL"
composer install
chmod -R 777 /var/www/html
echo "RUN SERVER BACK"
cd /var/www/html
php -S 0.0.0.0:8000 -t public
echo "FIN install.sh"