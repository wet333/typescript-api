FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g typescript nodemon

RUN npm install

COPY . .

COPY ./bcrypt-fix.sh ./

RUN ./bcrypt-fix.sh

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start-dev"]