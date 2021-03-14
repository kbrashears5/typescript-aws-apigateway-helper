<h1 align="center">typescript-aws-apigateway-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS API Gateway</b>
    
[![Build Status](https://dev.azure.com/kbrashears5/github/_apis/build/status/kbrashears5.typescript-aws-apigateway-helper?branchName=master)](https://dev.azure.com/kbrashears5/github/_build/latest?definitionId=20&branchName=master)
[![Tests](https://img.shields.io/azure-devops/tests/kbrashears5/github/20)](https://img.shields.io/azure-devops/tests/kbrashears5/github/20)
[![Code Coverage](https://img.shields.io/azure-devops/coverage/kbrashears5/github/20)](https://img.shields.io/azure-devops/coverage/kbrashears5/github/20)

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
