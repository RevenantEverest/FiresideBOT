#!/bin/bash

cd "$(dirname "$0")/.." || exit

cp -a resources/ api/src/
cp -a resources/ discord/src/

docker-compose stop

docker-compose -f docker-compose.yml -f override.dev.yml build api discord guildwars_event_tracker && docker-compose -f docker-compose.yml -f override.dev.yml up api discord guildwars_event_tracker