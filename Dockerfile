FROM node:buster as development

RUN npm install -g @nestjs/cli@11.0.2

USER node

EXPOSE 3000

WORKDIR /home/node/app