FROM node:18-alpine3.21

ENV MODE=development

USER node

WORKDIR /var/www/app

RUN chown node:node /var/www/app

COPY --chown=node:node ./package.json .
RUN npm install --loglevel verbose

COPY --chown=node:node . .

EXPOSE 9000

CMD if [ "${MODE}" == "development" ]; then npm run dev; elif [ "${MODE}" == "production" ]; then npm run build; fi