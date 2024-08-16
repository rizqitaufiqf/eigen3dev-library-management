FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run init-db

CMD ["npm", "run", "start"]
