## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ nvm list
$ nvm list available
$ nvm install 16.3.0
$ nvm use 16.3.0

$ npm i -g @nestjs/latest
$ nest new
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Validation

```bash
$ npm i class-validator class-transformer
```

## Docker-Compose
```bash
$ docker-compose up
$ docker-compose up --build -V
$ docker-compose down
$ docker ps
$ docker inspect afa3a614c7ed | gzep IPAddress

$ docker volume ls
$ docker-compose down
$ docker rm -f $(docker ps -a -q)
$ docker volume rm $(docker volume ls -q)
$ docker-compose up
```

## Docker
```bash
# Docker image digest
# FROM node:lts-alpine@sha256:b2da3316acdc2bec442190a1fe10dc094e7ba4121d029cb32075ff59bb27390a
$ docker pull node:lts-alpine
$ docker images --digests

# The -t option is for giving our image a name, i.e., tagging it.
$ docker build -t nestjs-course .
# runimage:
$ docker run -p 3000:3000 nestjs-course
$ docker images

# Remove image
$ docker rmi <your-image-id>
```

## Migration

```bash
$ npx typeorm migration:create -n CoffeeRefactor
// Define up and down methods in migration file (1624546035942-CoffeeRefactor.ts)
$ npm run build
$ npx typeorm migration:run
$ npx typeorm migration:revert

// Let TypeOrm generate migrations (for you)
$ npx typeorm migration:generate -n SchemaSync
$ npm run build
$ npx typeorm migration:run
$ npx typeorm migration:revert
```

## Test

```bash
# unit tests
$ npm run test
$ npm run test:watch -- coffees.service

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
