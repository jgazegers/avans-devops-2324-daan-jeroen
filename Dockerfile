FROM node:20

WORKDIR /app

COPY . .

RUN npm install

ENV PORT=3000
ENV MONGO_URL=mongodb://localhost:27017

CMD ["npm", "start"]