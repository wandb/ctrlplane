# https://github.com/WhiskeySockets/Baileys/issues/1003#issuecomment-2306467419
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine

RUN apk add --no-cache libc6-compat python3 make g++ curl

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN curl -L -o vcluster "https://github.com/loft-sh/vcluster/releases/latest/download/vcluster-linux-amd64" && \
    chmod +x vcluster && \
    mv vcluster /usr/local/bin

RUN npm install -g turbo
RUN npm install -g corepack@latest
RUN corepack enable pnpm

WORKDIR /app

COPY .gitignore .gitignore
COPY turbo.json turbo.json
RUN pnpm add -g turbo

COPY package.json package.json
COPY .npmrc .npmrc
COPY pnpm-*.yaml .

COPY tooling/prettier/package.json ./tooling/prettier/package.json
COPY tooling/eslint/package.json ./tooling/eslint/package.json
COPY tooling/typescript/package.json ./tooling/typescript/package.json

COPY packages/db/package.json ./packages/db/package.json
COPY packages/validators/package.json ./packages/validators/package.json
COPY packages/logger/package.json ./packages/logger/package.json
COPY packages/job-dispatch/package.json ./packages/job-dispatch/package.json
COPY packages/rule-engine/package.json ./packages/rule-engine/package.json
COPY packages/secrets/package.json ./packages/secrets/package.json
COPY packages/events/package.json ./packages/events/package.json

COPY apps/event-worker/package.json ./apps/event-worker/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN turbo build --filter=...@ctrlplane/event-worker

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

ENV NODE_ENV=production
ENV NODE_MAX_OLD_SPACE_SIZE=4096

EXPOSE 3123

CMD node -r ./apps/event-worker/dist/instrumentation-node.js --max-old-space-size=${NODE_MAX_OLD_SPACE_SIZE} apps/event-worker/dist/index.js
