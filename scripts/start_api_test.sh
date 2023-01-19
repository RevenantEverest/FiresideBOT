#!/bin/bash

cd "$(dirname "$0")/.." || exit

docker-compose stop
docker-compose -f docker-compose.yml -f override.test.yml build api && docker-compose -f docker-compose.yml -f override.test.yml --profile api up --exit-code-from api