#!/bin/sh

for i in 1 2 3
do
  docker exec cps-mongodb mongo -u cubanops -p cuban0ps-db cubanops --eval "db.clients.deleteMany({})"
  if [ $? = 0 ] ; then
    echo "Cleared mongodb data"
    exit 0
  fi
  sleep 1
done

echo "[ERROR]: Could not connect to mongo"
exit 1