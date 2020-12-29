import * as APIGateway from '@aws-sdk/client-api-gateway';
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
    public Repository: APIGateway.APIGateway;

    /**
     * Initializes new instance of APIGatewayHelper
     * @param logger {ILogger} Injected logger
     * @param repository {APIGateway.APIGateway} Injected Repository. A new repository will be created if not supplied
     * @param options {APIGateway.APIGatewayClientConfig} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: APIGateway.APIGateway,
        options?: APIGateway.APIGatewayClientConfig) {

        super(logger);
        options = this.ObjectOperations.IsNullOrEmpty(options) ? {} as APIGateway.APIGatewayClientConfig : options!;
        this.Repository = repository || new APIGateway.APIGateway(options);
    }

    /**
     * Create an API key
     * @param name {string} Name of new API key
     * @param description {string} Description of new API key
     * @param value {string} Value to give new API key. If not provided, will be auto generated
     */
    public async CreateApiKeyAsync(name: string,
        description: string,
        value?: string): Promise<APIGateway.ApiKey> {

        const action = `${APIGatewayHelper.name}.${this.CreateApiKeyAsync.name}`;
        this.LogHelper.LogInputs(action, { name, description, value });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(name)) { throw new Error(`[${action}]-Must supply name`); }
        if (this.ObjectOperations.IsNullOrWhitespace(description)) { throw new Error(`[${action}]-Must supply description`); }

        // create params object
        const params: APIGateway.CreateApiKeyRequest = {
            description,
            name,
        };
        if (this.ObjectOperations.IsNullOrWhitespace(value)) { params.generateDistinctId = true; } else { params.value = value; }
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.createApiKey(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Create an usage plan
     * @param name {string} Usage plan name
     * @param description {string} Usage plan description
     * @param apiStages {APIGateway.ApiStage[]} API stages to attach this usage plan to
     * @param quota {APIGateway.QuotaSettings} Quota settings
     * @param throttle {APIGateway.ThrottleSettings} Throttle settings
     */
    public async CreateUsagePlanAsync(name: string,
        description: string,
        apiStages: APIGateway.ApiStage[],
        quota?: APIGateway.QuotaSettings,
        throttle?: APIGateway.ThrottleSettings): Promise<APIGateway.UsagePlan> {

        const action = `${APIGatewayHelper.name}.${this.CreateUsagePlanAsync.name}`;
        this.LogHelper.LogInputs(action, { name, description, apiStages, quota, throttle });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(name)) { throw new Error(`[${action}]-Must supply name`); }
        if (this.ObjectOperations.IsNullOrWhitespace(description)) { throw new Error(`[${action}]-Must supply description`); }
        if (!apiStages || apiStages.length === 0) { throw new Error(`[${action}]-Must supply at least one apiStage`); }

        // create params object
        const params: APIGateway.CreateUsagePlanRequest = {
            apiStages,
            description,
            name,
            quota,
            throttle,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.createUsagePlan(params);
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
        usagePlanId: string): Promise<APIGateway.UsagePlanKey> {

        const action = `${APIGatewayHelper.name}.${this.CreateUsagePlanKeyAsync.name}`;
        this.LogHelper.LogInputs(action, { keyId, keyType, usagePlanId });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(keyId)) { throw new Error(`[${action}]-Must supply keyId`); }
        if (this.ObjectOperations.IsNullOrWhitespace(keyType)) { throw new Error(`[${action}]-Must supply keyType`); }
        if (this.ObjectOperations.IsNullOrWhitespace(usagePlanId)) { throw new Error(`[${action}]-Must supply usagePlanId`); }

        // create params object
        const params: APIGateway.CreateUsagePlanKeyRequest = {
            keyId,
            keyType,
            usagePlanId,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.createUsagePlanKey(params);
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
        const params: APIGateway.DeleteApiKeyRequest = {
            apiKey,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteApiKey(params);
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
        const params: APIGateway.DeleteUsagePlanRequest = {
            usagePlanId,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteUsagePlan(params);
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
        const params: APIGateway.DeleteUsagePlanKeyRequest = {
            keyId,
            usagePlanId,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteUsagePlanKey(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Get an API key
     * @param apiKey {string} API Key
     */
    public async GetApiKeyAsync(apiKey: string): Promise<APIGateway.ApiKey> {

        const action = `${APIGatewayHelper.name}.${this.GetApiKeyAsync.name}`;
        this.LogHelper.LogInputs(action, { apiKey });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(apiKey)) { throw new Error(`[${action}]-Must supply apiKey`); }

        // create params object
        const params: APIGateway.GetApiKeyRequest = {
            apiKey,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.getApiKey(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }
}
