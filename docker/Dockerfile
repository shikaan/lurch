FROM node:10-alpine

RUN npm i -g pm2

USER node
WORKDIR /home/node

COPY ./package.json /home/node
COPY ./package-lock.json /home/node
COPY ./src/ /home/node/src/

RUN npm i

RUN npm run build

EXPOSE 3000

CMD [ "pm2-runtime", "./lib/index.js" ]
