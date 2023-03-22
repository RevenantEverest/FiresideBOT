FROM node:19.8.1

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3006

CMD [ "yarn", "dev" ]