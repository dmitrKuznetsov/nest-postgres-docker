FROM node:12.13-alpine

RUN apk update

RUN apk add bash

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start"]