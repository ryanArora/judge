FROM node:16 AS development
WORKDIR /app

# Compile nsjail
RUN apt-get -y update && apt-get install -y \
    autoconf \
    bison \
    flex \
    gcc \
    g++ \
    git \
    libprotobuf-dev \
    libnl-route-3-dev \
    libtool \
    make \
    pkg-config \
    protobuf-compiler \
    && rm -rf /var/lib/apt/lists/*
COPY ./lib/nsjail /nsjail
RUN cd /nsjail && make && mv /nsjail/nsjail /bin && rm -rf -- /nsjail

ENV PORT=3000
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000
CMD [ "yarn", "dev" ]


FROM node:16 AS dependencies
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json yarn.lock .
RUN yarn install --frozen-lockfile


FROM node:16 AS builder
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY . .
RUN yarn install --frozen-lockfile --production=false && yarn build


FROM node:16 AS production
WORKDIR /app

# Compile nsjail
RUN apt-get -y update && apt-get install -y \
    autoconf \
    bison \
    flex \
    gcc \
    g++ \
    git \
    libprotobuf-dev \
    libnl-route-3-dev \
    libtool \
    make \
    pkg-config \
    protobuf-compiler \
    && rm -rf /var/lib/apt/lists/*
COPY ./lib/nsjail /nsjail
RUN cd /nsjail && make && mv /nsjail/nsjail /bin && rm -rf -- /nsjail

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
