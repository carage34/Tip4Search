# syntax=docker/dockerfile:1

FROM node:18-alpine
ARG TOKEN
ARG GUILD_ID
ARG CLIENT_ID
ARG CHANNEL_ID

ENV TOKEN=${TOKEN}
ENV GUILD_ID=${GUILD_ID}
ENV CLIENT_ID=${CLIENT_ID}
ENV CHANNEL_ID=${CHANNEL_ID}
ENV NODE_ENV=production

WORKDIR .

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "backend/server.js" ]
