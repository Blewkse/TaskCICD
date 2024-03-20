FROM node:20.11.1-alpine
WORKDIR /backend

COPY ./package.json .
COPY ./pnpm-lock.yaml .

RUN corepack enable
RUN corepack prepare pnpm@8.6.12 --activate

RUN pnpm install

COPY ./ ./

ENTRYPOINT [ "./entrypoint.sh" ]

EXPOSE 3333
