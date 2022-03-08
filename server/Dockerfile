FROM node:17-alpine AS frontend

WORKDIR /frontend/
COPY ./frontend/package.json ./
RUN npm install

COPY ./frontend .
RUN npm run build

FROM node:17-alpine AS backend
COPY --from=frontend /frontend/build /app/backend/src/public

WORKDIR /app/backend
COPY ./backend/package.json ./
RUN npm install

COPY ./backend .
WORKDIR /app/backend/build/public
WORKDIR /app/backend
RUN npm run build

EXPOSE 3000
CMD ["npm","start"]