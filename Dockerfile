# syntax=docker/dockerfile:1

FROM node:18-alpine
RUN apk add --update cron
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

# Add crontab file in the cron directory
ADD crontab /etc/cron.d/hello-cron

# Give execution rights on the cron job
RUN chmod +x /etc/cron.d/hello-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
CMD cron && tail -f /var/log/cron.log

CMD [ "node", "backend/server.js" ]
