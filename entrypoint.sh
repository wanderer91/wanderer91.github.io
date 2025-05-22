#!/bin/sh

cd /var/www/app
cp -rfu ../install/node_modules/. ./node_modules/
chown -R node:node ./node_modules

if [ "$MODE" = "development" ]; then
    npm run dev
elif [ "$MODE" = "production" ]; then
    npm run build
fi