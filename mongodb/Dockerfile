FROM mongo:latest

COPY ./createUser.sh ./docker-entrypoint-initdb.d/createUser.sh

EXPOSE 27017

CMD ["mongod"]