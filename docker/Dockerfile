FROM node:10-alpine

RUN npm i -g pm2

ARG DT_API_URL
ARG DT_API_TOKEN
ARG DT_ONEAGENT_OPTIONS="flavor=musl&include=nodejs"

ENV DT_HOME="/opt/dynatrace/oneagent"

RUN mkdir -p "$DT_HOME" && \
    wget -O "$DT_HOME/oneagent.zip" "$DT_API_URL/v1/deployment/installer/agent/unix/paas/latest?Api-Token=$DT_API_TOKEN&$DT_ONEAGENT_OPTIONS" && \
    unzip -d "$DT_HOME" "$DT_HOME/oneagent.zip" && \
    rm "$DT_HOME/oneagent.zip"


USER node
WORKDIR /home/node

COPY ./package.json /home/node
COPY ./package-lock.json /home/node
COPY ./src/ /home/node/src/

RUN npm i

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "/opt/dynatrace/oneagent/dynatrace-agent64.sh" ]
CMD [ "pm2-runtime", "./lib/index.js" ]
