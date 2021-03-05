FROM node:alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN CI=true yarn --ci
COPY . .
CMD ["yarn", "start"]
