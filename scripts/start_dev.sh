#!/bin/bash

cd "$(dirname "$0")/.." || exit

cp .env api/
cp .env discord/
cp .env trackers/

cp -a resources/ api/src/
cp -a resources/ discord/src/
cp -a resources/ trackers/src/

docker-compose stop

docker-compose --env-file .env -f docker-compose.yml -f override.dev.yml build api discord trackers && docker-compose -f docker-compose.yml -f override.dev.yml up api discord trackers