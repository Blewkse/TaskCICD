#!/bin/sh

node ace migration:run
node ace db:seed

pnpm run dev
