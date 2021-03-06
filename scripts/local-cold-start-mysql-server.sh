#!/usr/bin/env bash
docker run -p 3307:3306 -p 33060:33060 --name=mysql-server-instance --mount type=bind,source="$(pwd)"/scripts,target=/app/scripts -d mysql/mysql-server

echo "Booting up mysql server..."
. "$(pwd)"/scripts/wait-for-container.sh mysql-server-instance 120

PASS=$(docker logs mysql-server-instance 2>&1 | grep GENERATED | sed -n 's/.*PASSWORD: //p')
docker exec mysql-server-instance mysql -u root -p$PASS -e "source /app/scripts/docker_config.sql" --connect-expired-password
