FROM node:8.11.3

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .

RUN npm install --silent
RUN npm install react-scripts@1.1.4 -g --silent


CMD [ "npm", "start" ]