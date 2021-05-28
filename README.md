<h1 align="center">typescript-aws-apigateway-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS API Gateway</b>
    
[![CI/CD](https://github.com/kbrashears5/typescript-aws-apigateway-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-apigateway-helper/actions/workflows/ci-cd.yml)

[![NPM Version](https://img.shields.io/npm/v/typescript-aws-apigateway-helper)](https://img.shields.io/npm/v/typescript-aws-apigateway-helper)
[![Downloads](https://img.shields.io/npm/dt/typescript-aws-apigateway-helper)](https://img.shields.io/npm/dt/typescript-aws-apigateway-helper)

</div>

## Install

```
npm install typescript-aws-apigateway-helper@latest
```

## Usage

### Default - running in Lambda in your own account

```typescript
const logger = new Logger(LogLevel.Trace);

const helper = new APIGatewayHelper(logger);

const response = await helper.CreateApiKeyAsync(
  'apiKey',
  'description',
  'value',
);
```

### Running in separate account or not in Lambda

```typescript
import * as APIGateway from '@aws-sdk/client-api-gateway';

const logger = new Logger(LogLevel.Trace);

const options: APIGateway.APIGatewayClientConfig = {
  accessKeyId: '{access_key}',
  secretAccessKey: '{secret_key}',
  region: 'us-east-1',
};

const repository = new APIGateway.APIGateway(options);

const helper = new APIGatewayHelper(logger, repository);

const response = await helper.CreateApiKeyAsync(
  'apiKey',
  'description',
  'value',
);
```

## Notes

If no options are supplied, will default to `us-east-1` as the region

## Development

Clone the latest and run

```npm
npm run prep
```

to install packages and prep the git hooks
