# image-search-api

## Disclaimer
This is an experiment for learning purposes, if you plan to search Google images in a production environment please consider utilizing Google Cloud APIs

## Description
An API written on top of the Nestjs framework that fetches a listing of images and their original source.

## Installation

```bash
$ npm install
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

## Usage
This API uses a simple unsecure matching token, the chosen token must be set in .env file. Then, on each request pass the token on authorization key in headers request.

### Examples

List 20 first images that matches the term "my neighbor totoro":
```bash
$ curl --location --request GET 'http://localhost:3000/get-image-list/my%20neighbor%20totoro' --header 'Authorization:YOUR_SECURE_TOKEN'
```

Based on previous request information, the actual src of an image:
```bash
$ curl --location --request GET 'http://localhost:3000/get-image?url=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dp%25C3%25A3o%26tbm%3Disch%23imgrc%3DT3rb4Eaggh1RJM&id=T3rb4Eaggh1RJM' --header 'Authorization:YOUR_SECURE_TOKEN'
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
