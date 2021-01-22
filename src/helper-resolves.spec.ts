import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import { APIGatewayHelper } from './helper';
import * as APIGateway from '@aws-sdk/client-api-gateway';

const apiKeyResponse: APIGateway.ApiKey = {};
const deleteApiKeyResponse: object = {};
const deleteUsagePlanResponse: object = {};
const deleteUsagePlanKeyResponse: object = {};
const usagePlanResponse: APIGateway.UsagePlan = {};
const usagePlanKeyResponse: APIGateway.UsagePlanKey = {};

const createApiKey = jest.fn().mockImplementation(() => {
    return Promise.resolve<APIGateway.ApiKey>(apiKeyResponse);
});
const createUsagePlan = jest.fn().mockImplementation(() => {
    return Promise.resolve<APIGateway.UsagePlan>(usagePlanResponse);
});
const createUsagePlanKey = jest.fn().mockImplementation(() => {
    return Promise.resolve<APIGateway.UsagePlanKey>(usagePlanKeyResponse);
});
const deleteApiKey = jest.fn().mockImplementation(() => {
    return Promise.resolve<{}>(deleteApiKeyResponse);
});
const deleteUsagePlan = jest.fn().mockImplementation(() => {
    return Promise.resolve<{}>(deleteUsagePlanResponse);
});
const deleteUsagePlanKey = jest.fn().mockImplementation(() => {
    return Promise.resolve<{}>(deleteUsagePlanKeyResponse);
});
const getApiKey = jest.fn().mockImplementation(() => {
    return Promise.resolve<APIGateway.ApiKey>(apiKeyResponse);
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
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMock.CreateApiKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} name`, () => {
        const actual = apiGatewayHelperMock.CreateApiKeyAsync(TestValues.EmptyString,
            TestValues.Description);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(`${TestValues.ThrowsOnEmpty} description`, () => {
        const actual = apiGatewayHelperMock.CreateApiKeyAsync(TestValues.Name,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} description`);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMock.CreateApiKeyAsync(TestValues.Name,
            TestValues.Description,
            TestValues.StringValue);
        return expect(actual).resolves.toEqual(apiKeyResponse);
    });
});

/**
 * Test the CreateUsagePlanAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.CreateUsagePlanAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMock.CreateUsagePlanAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} name`, () => {
        const actual = apiGatewayHelperMock.CreateUsagePlanAsync(TestValues.EmptyString,
            TestValues.Description,
            TestValues.ApiStageArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(`${TestValues.ThrowsOnEmpty} description`, () => {
        const actual = apiGatewayHelperMock.CreateUsagePlanAsync(TestValues.Name,
            TestValues.EmptyString,
            TestValues.ApiStageArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} description`);
    });
    test(`${TestValues.ThrowsOnEmpty} apiStages`, () => {
        const actual = apiGatewayHelperMock.CreateUsagePlanAsync(TestValues.Name,
            TestValues.Description,
            TestValues.EmptyArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} at least one apiStage`);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMock.CreateUsagePlanAsync(TestValues.Name,
            TestValues.Description,
            TestValues.ApiStageArray);
        return expect(actual).resolves.toEqual(usagePlanResponse);
    });
});

/**
 * Test the CreateUsagePlanKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.CreateUsagePlanKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMock.CreateUsagePlanKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} keyId`, () => {
        const actual = apiGatewayHelperMock.CreateUsagePlanKeyAsync(TestValues.EmptyString,
            TestValues.Key,
            TestValues.UsagePlanId);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyId`);
    });
    test(`${TestValues.ThrowsOnEmpty} keyType`, () => {
        const actual = apiGatewayHelperMock.CreateUsagePlanKeyAsync(TestValues.Key,
            TestValues.EmptyString,
            TestValues.UsagePlanId);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyType`);
    });
    test(`${TestValues.ThrowsOnEmpty} usagePlanId`, () => {
        const actual = apiGatewayHelperMock.CreateUsagePlanKeyAsync(TestValues.Name,
            TestValues.Description,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} usagePlanId`);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMock.CreateUsagePlanKeyAsync(TestValues.Name,
            TestValues.Description,
            TestValues.UsagePlanId);
        return expect(actual).resolves.toEqual(usagePlanKeyResponse);
    });
});

/**
 * Test the DeleteApiKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.DeleteApiKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMock.DeleteApiKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} apiKey`, () => {
        const actual = apiGatewayHelperMock.DeleteApiKeyAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} apiKey`);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMock.DeleteApiKeyAsync(TestValues.Key);
        return expect(actual).resolves.toEqual(deleteApiKeyResponse);
    });
});

/**
 * Test the DeleteUsagePlanAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.DeleteUsagePlanAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMock.DeleteUsagePlanAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} usagePlanId`, () => {
        const actual = apiGatewayHelperMock.DeleteUsagePlanAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} usagePlanId`);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMock.DeleteUsagePlanAsync(TestValues.UsagePlanId);
        return expect(actual).resolves.toEqual(deleteUsagePlanResponse);
    });
});

/**
 * Test the DeleteUsagePlanKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.DeleteUsagePlanKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMock.DeleteUsagePlanKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} keyId`, () => {
        const actual = apiGatewayHelperMock.DeleteUsagePlanKeyAsync(TestValues.EmptyString,
            TestValues.UsagePlanId);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} keyId`);
    });
    test(`${TestValues.ThrowsOnEmpty} usagePlanId`, () => {
        const actual = apiGatewayHelperMock.DeleteUsagePlanKeyAsync(TestValues.Key,
            TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} usagePlanId`);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMock.DeleteUsagePlanKeyAsync(TestValues.Key,
            TestValues.UsagePlanId);
        return expect(actual).resolves.toEqual(deleteUsagePlanKeyResponse);
    });
});

/**
 * Test the GetApiKeyAsync method
 */
describe(`${APIGatewayHelper.name}.${apiGatewayHelperMock.GetApiKeyAsync.name}`, () => {
    // set action for this method
    const action = `${APIGatewayHelper.name}.${apiGatewayHelperMock.GetApiKeyAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} apiKey`, () => {
        const actual = apiGatewayHelperMock.GetApiKeyAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} apiKey`);
    });
    test(TestValues.ValidTest, () => {
        const actual = apiGatewayHelperMock.GetApiKeyAsync(TestValues.Key);
        return expect(actual).resolves.toEqual(apiKeyResponse);
    });
});
