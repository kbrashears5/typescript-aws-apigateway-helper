import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import { APIGatewayHelper } from './helper';

const error = new Error(`AWS Error`);

const createApiKey = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const createUsagePlan = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const createUsagePlanKey = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const deleteApiKey = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const deleteUsagePlan = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const deleteUsagePlanKey = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const getApiKey = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});

// mock the functions
jest.mock('@aws-sdk/client-api-gateway', () => {
  return {
    APIGateway: jest.fn().mockImplementation(() => {
      return {
        createApiKey,
        createUsagePlan,
        createUsagePlanKey,
        deleteApiKey,
        deleteUsagePlan,
        deleteUsagePlanKey,
        getApiKey,
      };
    }),
  };
});

const logger = new Logger(LogLevel.Off);
const apiGatewayHelperMock = new APIGatewayHelper(logger);
const TestValues = new TestingValues();

/**
 * Test the CreateApiKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.CreateApiKeyAsync.name}`, () => {
  test(`${TestValues.InvalidTest}`, () => {
    const actual = apiGatewayHelperMock.CreateApiKeyAsync(
      TestValues.Name,
      TestValues.Description,
      TestValues.StringValue,
    );
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the CreateUsagePlanAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.CreateUsagePlanAsync.name}`, () => {
  test(`${TestValues.InvalidTest}`, () => {
    const actual = apiGatewayHelperMock.CreateUsagePlanAsync(
      TestValues.Name,
      TestValues.Description,
      TestValues.ApiStageArray,
    );
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the CreateUsagePlanKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.CreateUsagePlanKeyAsync.name}`, () => {
  test(`${TestValues.InvalidTest}`, () => {
    const actual = apiGatewayHelperMock.CreateUsagePlanKeyAsync(
      TestValues.Name,
      TestValues.Description,
      TestValues.UsagePlanId,
    );
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the DeleteApiKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.DeleteApiKeyAsync.name}`, () => {
  test(`${TestValues.InvalidTest}`, () => {
    const actual = apiGatewayHelperMock.DeleteApiKeyAsync(TestValues.Key);
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the DeleteUsagePlanAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.DeleteUsagePlanAsync.name}`, () => {
  test(`${TestValues.InvalidTest}`, () => {
    const actual = apiGatewayHelperMock.DeleteUsagePlanAsync(
      TestValues.UsagePlanId,
    );
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the DeleteUsagePlanKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.DeleteUsagePlanKeyAsync.name}`, () => {
  test(`${TestValues.InvalidTest}`, () => {
    const actual = apiGatewayHelperMock.DeleteUsagePlanKeyAsync(
      TestValues.Key,
      TestValues.UsagePlanId,
    );
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the GetApiKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.GetApiKeyAsync.name}`, () => {
  test(`${TestValues.InvalidTest}`, () => {
    const actual = apiGatewayHelperMock.GetApiKeyAsync(TestValues.Key);
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});
