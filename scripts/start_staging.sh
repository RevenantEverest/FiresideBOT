#!/bin/bash

cd "$(dirname "$0")/.." || exit

cp -a resources/ api/src/
cp -a resources/ discord/src/

docker-compose stop

docker-compose -f docker-compose.yml -f override.staging.yml build api discord && docker-compose -f docker-compose.yml -f override.staging.yml up -d api discord