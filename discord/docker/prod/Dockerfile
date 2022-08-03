FROM node:17.8.0

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3002

CMD [ "yarn", "start" ]