FROM node:17-alpine AS frontend

WORKDIR /frontend/
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm ci

COPY ./frontend .
RUN npm install -g @ionic/cli@6.19.0
RUN ionic build --engine browser

FROM node:17-alpine AS backend

WORKDIR /app/backend/build/public
WORKDIR /app/backend
COPY ./backend/package.json ./
COPY ./backend/package-lock.json ./
RUN npm ci

COPY ./backend .
COPY --from=frontend /frontend/build /app/backend/build/public

RUN npm run build

EXPOSE 3000
CMD ["npm","start"]