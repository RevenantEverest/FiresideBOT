#!/bin/bash

cd "$(dirname "$0")/../.." || exit

docker compose exec testing_db sh -c "psql -d \$POSTGRES_DB -U \$POSTGRES_USER -c \"DROP SCHEMA public CASCADE;\" -c \"CREATE SCHEMA public;\""

docker-compose exec api sh -c "yarn test"