FROM mysql:5.7

FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm db:reset

CMD ["npm", "start"]
