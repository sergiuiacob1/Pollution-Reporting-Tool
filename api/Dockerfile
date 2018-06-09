# create a file named Dockerfile
FROM node:7.5.0
RUN mkdir /application
WORKDIR /application
COPY package.json /application
RUN npm install
RUN npm install nodemon -g

COPY . /application
RUN ls -al
EXPOSE 2222
CMD ["npm", "start"]