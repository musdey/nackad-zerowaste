# FROM node:17-alpine AS frontend

# WORKDIR /frontend/
# COPY ./frontend/package.json ./
# RUN npm install

# COPY ./frontend .
# RUN npm run build

FROM node:17-alpine

#WORKDIR /app/backend/build/public
WORKDIR /app/backend
COPY ./package.json ./
RUN npm install

COPY . .
#COPY --from=frontend /frontend/build /app/backend/build/public

RUN npm run build

EXPOSE 3000
CMD ["npm","start"]