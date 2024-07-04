# 1. Сборка проекта на vite
FROM node:latest
#FROM node:18.20.2-alpine

WORKDIR /sim

COPY package.json .

ENV NODE_OPTIONS=--max_old_space_size=1024

RUN npm install

COPY . .

RUN npm run build

RUN npm run script

CMD ["npm", "run", "startPU"]
