FROM node:12.15.0

ENV NODE_ENV=development

RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

CMD ["yarn", "dev"]
