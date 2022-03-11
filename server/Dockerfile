FROM node:17-alpine AS frontend

WORKDIR /frontend/
COPY ./frontend/package.json ./
RUN npm install

COPY ./frontend .
RUN npm install -g ionic
RUN ionic build --engine browser

FROM node:17-alpine AS backend

WORKDIR /app/backend/build/public
WORKDIR /app/backend
COPY ./backend/package.json ./
RUN npm install

COPY ./backend .
COPY --from=frontend /frontend/build /app/backend/build/public

RUN npm run build

EXPOSE 3000
CMD ["npm","start"]