FROM mongo:5.0.6

COPY ./createUser.sh ./docker-entrypoint-initdb.d/createUser.sh

EXPOSE 27017

CMD ["mongod"]