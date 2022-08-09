#!/bin/bash
# .docker/init-user-db.sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER postgres;
  CREATE DATABASE rmhtc_local;
  GRANT ALL PRIVILEGES ON DATABASE postgres TO rmhtc_local;
EOSQL