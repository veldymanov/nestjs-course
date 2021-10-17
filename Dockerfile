FROM node:16.3-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.3-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
# install only dependecies
RUN npm install --production
COPY . .
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]

# $ docker pull node:lts-alpine
# FROM node:lts-alpine@sha256:21b87afa5f267e50b806f696f754b15b37b4118bb0ef722192f27ddff78d8d67
# FROM node:16.3-alpine
# WORKDIR /usr/src/app
# COPY . /usr/src/app
# RUN npm install
# CMD "npm" "start"