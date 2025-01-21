# First stage: Build the frontend
FROM node:20-alpine as frontend

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Second stage: Use the built frontend in an Apache image

FROM nginx:stable-alpine3.19-slim

COPY --from=frontend /app/dist /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d