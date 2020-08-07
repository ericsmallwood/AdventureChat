FROM node:12.15.0-alpine
WORKDIR /opt/adventure-chat
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
CMD ["yarn", "start"]
