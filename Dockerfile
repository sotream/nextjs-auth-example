FROM node:18.14.0-alpine3.16

RUN apk add curl
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
#RUN npm i
RUN yarn --production
COPY ./.next /usr/src/app/.next
COPY ./public /usr/src/app/public
COPY ./next-i18next.config.js /usr/src/app/next-i18next.config.js
COPY ./next.config.prod.js /usr/src/app/next.config.js
COPY ./.env.production /usr/src/app/.env.production

EXPOSE 3000

CMD ["yarn", "start"]
