# judge

a work in progress programming judge.

## Setup

### Development

Copy the example environment variables.
Then fill in empty values in the `.env` file.

```sh
cp .env.example .env
vim .env
```

Install dependencies

```sh
yarn install
```

Start the app

```sh
docker-compose up
```

You can see it at `http://localhost:3000`

### Production

Copy the example environment variables.
Then fill in empty values in the `.env.prod` file.

```sh
cp .env.example .env.prod
vim .env.prod
```

Build the production image

```sh
docker build --target production -t judge-prod .
```

You might have to push the prisma schema to your database.

```sh
docker run --env-file .env.prod -it judge-prod /usr/bin/bash
yarn prisma db push
exit
```

Run the app

```sh
docker run -p 8080:80 --env-file .env.prod -it judge-prod
```

You can see it at `http://localhost:8080`
