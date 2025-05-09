ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g turbo
RUN npm install -g corepack@latest
RUN corepack enable pnpm

COPY .gitignore .gitignore
COPY turbo.json turbo.json
RUN pnpm add -g turbo

COPY package.json package.json
COPY pnpm-*.yaml .

COPY tooling/prettier/package.json ./tooling/prettier/package.json
COPY tooling/eslint/package.json ./tooling/eslint/package.json
COPY tooling/typescript/package.json ./tooling/typescript/package.json

COPY packages/logger/package.json ./packages/logger/package.json
COPY packages/validators/package.json ./packages/validators/package.json
COPY packages/secrets/package.json ./packages/secrets/package.json
COPY packages/db/package.json ./packages/db/package.json

RUN pnpm install --frozen-lockfile
COPY . .

RUN turbo build --filter=@ctrlplane/db...

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY ./packages/db/drizzle ./packages/db/dist/drizzle

ENV NODE_ENV=production

CMD ["node", "packages/db/dist/migrate.js"]
