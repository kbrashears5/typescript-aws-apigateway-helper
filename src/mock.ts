import { BaseMock } from 'typescript-helper-functions';
import * as APIGateway from '@aws-sdk/client-api-gateway';

/**
 * APIGateway Mock class
 */
export class APIGatewayMock extends BaseMock {

    /**
     * Mocks an APIGateway.ApiKey response
     */
    public ApiKey: APIGateway.ApiKey = {};

    /**
     * Mocks an APIGateway.DeleteApiKey response
     * Technically does not exist
     */
    public DeleteApiKey: object = {};

    /**
     * Mocks an APIGateway.DeleteUsagePlan response
     * Technically does not exist
     */
    public DeleteUsagePlan: object = {};

    /**
     * Mocks an APIGateway.DeleteUsagePlanKey response
     * Technically does not exist
     */
    public DeleteUsagePlanKey: object = {};

    /**
     * Mocks an APIGateway.UsagePlan response
     */
    public UsagePlan: APIGateway.UsagePlan = {};

    /**
     * Mocks an APIGateway.UsagePlanKey response
     */
    public UsagePlanKey: APIGateway.UsagePlanKey = {};

    /**
     * Create the APIGateway mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // create api key response
            createApiKey: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<APIGateway.ApiKey>(this.ApiKey);
                }),
            },
            // create usage plan response
            createUsagePlan: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<APIGateway.UsagePlan>(this.UsagePlan);
                }),
            },
            // create usage plan key response
            createUsagePlanKey: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<APIGateway.UsagePlanKey>(this.UsagePlanKey);
                }),
            },
            // delete api key response
            deleteApiKey: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteApiKey);
                }),
            },
            // delete usage plan response
            deleteUsagePlan: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteUsagePlan);
                }),
            },
            // delete usage plan key response
            deleteUsagePlanKey: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteUsagePlanKey);
                }),
            },
            // get api key response
            getApiKey: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<APIGateway.ApiKey>(this.ApiKey);
                }),
            },
        };

        const options = {} as APIGateway.APIGatewayClientConfig;

        // create the functions
        let functions = new APIGateway.APIGateway(options);
        functions = {
            createApiKey: () => awsResponses.createApiKey,
            createUsagePlan: () => awsResponses.createUsagePlan,
            createUsagePlanKey: () => awsResponses.createUsagePlanKey,
            deleteApiKey: () => awsResponses.deleteApiKey,
            deleteUsagePlan: () => awsResponses.deleteUsagePlan,
            deleteUsagePlanKey: () => awsResponses.deleteUsagePlanKey,
            getApiKey: () => awsResponses.getApiKey,
        };

        return functions;
    }
}
