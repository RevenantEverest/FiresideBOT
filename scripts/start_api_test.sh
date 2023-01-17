#!/bin/bash

cd "$(dirname "$0")/.." || exit

docker-compose stop

# docker-compose -f docker-compose.yml -f override.test.yml build api && docker-compose -f docker-compose.yml -f override.test.yml up --exit-code-from api

docker pull postgres:14.5 && docker run --name testing-db -e POSTGRES_USER="\$DB_USERNAME" -e POSTGRES_PASSWORD="\$DB_PASSWORD" -e POSTGRES_DB="\$TESTING_DB_NAME" -d postgres