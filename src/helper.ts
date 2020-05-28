import * as AWS from 'aws-sdk';
import { ILogger } from 'typescript-ilogger';
import { BaseClass } from 'typescript-helper-functions';
import { IAPIGatewayHelper } from './interface';

/**
 * APIGateway Helper
 */
export class APIGatewayHelper extends BaseClass implements IAPIGatewayHelper {

    /**
     * AWS Repository for APIGateway
     */
    public Repository: AWS.APIGateway;

    /**
     * Initializes new instance of APIGatewayHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.APIGateway} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.APIGateway.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.APIGateway,
        options?: AWS.APIGateway.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.APIGateway(options);
    }

    /**
     * Create an API key
     * @param name {string} Name of new API key
     * @param description {string} Description of new API key
     * @param value {string} Value to give new API key. If not provided, will be auto generated
     */
    public async CreateApiKeyAsync(name: string,
        description: string,
        value?: string): Promise<AWS.APIGateway.ApiKey> {

        const action = `${APIGatewayHelper.name}.${this.CreateApiKeyAsync.name}`;
        this.LogHelper.LogInputs(action, { name, description, value });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(name)) { throw new Error(`[${action}]-Must supply name`); }
        if (this.ObjectOperations.IsNullOrWhitespace(description)) { throw new Error(`[${action}]-Must supply description`); }

        // create params object
        const params: AWS.APIGateway.CreateApiKeyRequest = {
            description,
            name,
        };
        if (this.ObjectOperations.IsNullOrWhitespace(value)) { params.generateDistinctId = true; } else { params.value = value; }
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.createApiKey(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Create an usage plan
     * @param name {string} Usage plan name
     * @param description {string} Usage plan description
     * @param apiStages {AWS.APIGateway.ApiStage[]} API stages to attach this usage plan to
     * @param quota {AWS.APIGateway.QuotaSettings} Quota settings
     * @param throttle {AWS.APIGateway.ThrottleSettings} Throttle settings
     */
    public async CreateUsagePlanAsync(name: string,
        description: string,
        apiStages: AWS.APIGateway.ApiStage[],
        quota?: AWS.APIGateway.QuotaSettings,
        throttle?: AWS.APIGateway.ThrottleSettings): Promise<AWS.APIGateway.UsagePlan> {

        const action = `${APIGatewayHelper.name}.${this.CreateUsagePlanAsync.name}`;
        this.LogHelper.LogInputs(action, { name, description, apiStages, quota, throttle });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(name)) { throw new Error(`[${action}]-Must supply name`); }
        if (this.ObjectOperations.IsNullOrWhitespace(description)) { throw new Error(`[${action}]-Must supply description`); }
        if (!apiStages || apiStages.length === 0) { throw new Error(`[${action}]-Must supply at least one apiStage`); }

        // create params object
        const params: AWS.APIGateway.CreateUsagePlanRequest = {
            apiStages,
            description,
            name,
            quota,
            throttle,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.createUsagePlan(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Create an usage plan key
     * @param keyId {string} ID of usage plan key
     * @param keyType {string} Type of key to create
     * @param usagePlanId {string} Usage plan id to associate with
     */
    public async CreateUsagePlanKeyAsync(keyId: string,
        keyType: string,
        usagePlanId: string): Promise<AWS.APIGateway.UsagePlanKey> {

        const action = `${APIGatewayHelper.name}.${this.CreateUsagePlanKeyAsync.name}`;
        this.LogHelper.LogInputs(action, { keyId, keyType, usagePlanId });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(keyId)) { throw new Error(`[${action}]-Must supply keyId`); }
        if (this.ObjectOperations.IsNullOrWhitespace(keyType)) { throw new Error(`[${action}]-Must supply keyType`); }
        if (this.ObjectOperations.IsNullOrWhitespace(usagePlanId)) { throw new Error(`[${action}]-Must supply usagePlanId`); }

        // create params object
        const params: AWS.APIGateway.CreateUsagePlanKeyRequest = {
            keyId,
            keyType,
            usagePlanId,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.createUsagePlanKey(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Delete an API key
     * @param apiKey {string} API key to delete
     */
    public async DeleteApiKeyAsync(apiKey: string): Promise<object> {

        const action = `${APIGatewayHelper.name}.${this.DeleteApiKeyAsync.name}`;
        this.LogHelper.LogInputs(action, { apiKey });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(apiKey)) { throw new Error(`[${action}]-Must supply apiKey`); }

        // create params object
        const params: AWS.APIGateway.DeleteApiKeyRequest = {
            apiKey,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteApiKey(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Delete an usage plan
     * @param usagePlanId {string} Usage plan to delete
     */
    public async DeleteUsagePlanAsync(usagePlanId: string): Promise<object> {

        const action = `${APIGatewayHelper.name}.${this.DeleteUsagePlanAsync.name}`;
        this.LogHelper.LogInputs(action, { usagePlanId });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(usagePlanId)) { throw new Error(`[${action}]-Must supply usagePlanId`); }

        // create params object
        const params: AWS.APIGateway.DeleteUsagePlanRequest = {
            usagePlanId,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteUsagePlan(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Delete an usage plan key
     * @param keyId {string} Key to delete
     * @param usagePlanId {string} Usage plan that is associated with this key
     */
    public async DeleteUsagePlanKeyAsync(keyId: string,
        usagePlanId: string): Promise<object> {

        const action = `${APIGatewayHelper.name}.${this.DeleteUsagePlanKeyAsync.name}`;
        this.LogHelper.LogInputs(action, { keyId, usagePlanId });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(keyId)) { throw new Error(`[${action}]-Must supply keyId`); }
        if (this.ObjectOperations.IsNullOrWhitespace(usagePlanId)) { throw new Error(`[${action}]-Must supply usagePlanId`); }

        // create params object
        const params: AWS.APIGateway.DeleteUsagePlanKeyRequest = {
            keyId,
            usagePlanId,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteUsagePlanKey(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Get an API key
     * @param apiKey {string} API Key
     */
    public async GetApiKeyAsync(apiKey: string): Promise<AWS.APIGateway.ApiKey> {

        const action = `${APIGatewayHelper.name}.${this.GetApiKeyAsync.name}`;
        this.LogHelper.LogInputs(action, { apiKey });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(apiKey)) { throw new Error(`[${action}]-Must supply apiKey`); }

        // create params object
        const params: AWS.APIGateway.GetApiKeyRequest = {
            apiKey,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.getApiKey(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }
}
