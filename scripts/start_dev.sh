#!/bin/bash

cd "$(dirname "$0")/.." || exit

docker-compose stop

docker-compose -f docker-compose.yml -f override.dev.yml build api && docker-compose -f docker-compose.yml -f override.dev.yml up api