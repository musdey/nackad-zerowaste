#!/bin/bash
set -e

mongo <<EOF
use admin
db.auth(  '$MONGO_INITDB_ROOT_USERNAME',  '$MONGO_INITDB_ROOT_PASSWORD')
use $MONGO_INITDB_DATABASE
db.createUser({
  user:  '$MONGO_NON_ROOT_USERNAME',
  pwd: '$MONGO_NON_ROOT_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})
EOF