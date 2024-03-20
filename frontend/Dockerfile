FROM node:20.11.1-alpine
WORKDIR /frontend
 
COPY ./package.json .
COPY ./pnpm-lock.yaml .
 
RUN corepack enable
RUN corepack prepare pnpm@8.10.2 --activate
 
RUN pnpm install
 
EXPOSE 3000