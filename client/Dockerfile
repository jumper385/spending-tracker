FROM node:alpine

WORKDIR /app

COPY ./package.json ./package.json
RUN npm install
RUN npm run build

COPY . .
CMD ["node","./build/index.js"]