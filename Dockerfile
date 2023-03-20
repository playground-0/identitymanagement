FROM node:19-alpine3.16

WORKDIR /app/questions

COPY [".nvmrc", "package.json", "yarn.lock", "./"]
RUN yarn

COPY ["tsconfig.json", "server.ts", "env.ts", "./"]
COPY ["src/", "./src"]
RUN yarn build

CMD ["yarn", "start"]
