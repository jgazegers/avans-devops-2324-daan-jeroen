FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN npm install nodemon -g

EXPOSE 3000

CMD ["nodemon", "./bin/www"]
