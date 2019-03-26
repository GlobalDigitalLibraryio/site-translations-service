# site-translations

Collection of site translations

## Requirements

### Install serverless

`$ npm install -g serverless`

## Install dependencies, build and run

Install dependencies using

`$ npm install`

### Run serverless functions locally

To be able to run serverless functions locally we are using [serverless-offline](https://www.npmjs.com/package/serverless-offline).
By using the command below you are able to trigger functions through `localhost:3000/<function>`

`$ npm run dev`

## Plugins

The application uses some serverless plugins which may affect the use of additional plugins (so you are aware). Current plugins used are:

- [serverless-vpc-discovery](https://github.com/amplify-education/serverless-vpc-discovery#readme)
- [serverless-plugin-warmup](https://github.com/FidelLimited/serverless-plugin-warmup)
- [serverless-offline](https://www.npmjs.com/package/serverless-offline)
