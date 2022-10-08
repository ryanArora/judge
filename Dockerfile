FROM node:16 AS development
WORKDIR /app
ENV PORT=3000
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000
CMD [ "yarn", "dev" ]

FROM node:16 AS dependencies
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY package.json yarn.lock .
RUN yarn install --frozen-lockfile

FROM node:16 AS builder
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --production=false && yarn build

FROM node:16 AS production
WORKDIR /app
ENV PORT=80
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --chown=node --from=builder /app/next.config.mjs ./
COPY --chown=node --from=builder /app/public ./public
COPY --chown=node --from=builder /app/.next ./.next
COPY --chown=node --from=builder /app/src/env ./src/env
COPY --chown=node --from=builder /app/yarn.lock /app/package.json ./
COPY --chown=node --from=dependencies /app/node_modules ./node_modules

COPY --chown=node --from=builder /app/prisma ./prisma
RUN yarn prisma generate

USER node

EXPOSE 80
CMD [ "yarn", "start" ]
