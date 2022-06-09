#!/bin/bash

cd "$(dirname "$0")/.." || exit

docker-compose exec db sh -c "psql -d \$POSTGRES_DB -U \$POSTGRES_USER"