import * as APIGateway from '@aws-sdk/client-api-gateway';

/**
 * APIGateway Helper
 */
export interface IAPIGatewayHelper {
  /**
   * Create an API key
   * @param name {string} Name of new API key
   * @param description {string} Description of new API key
   * @param value {string} Value to give new API key. If not provided, will be auto generated
   */
  CreateApiKeyAsync(
    name: string,
    description: string,
    value?: string,
  ): Promise<APIGateway.ApiKey>;

  /**
   * Create an usage plan
   * @param name {string} Usage plan name
   * @param description {string} Usage plan description
   * @param apiStages {APIGateway.ApiStage[]} API stages to attach this usage plan to
   * @param quota {APIGateway.QuotaSettings} Quota settings
   * @param throttle {APIGateway.ThrottleSettings} Throttle settings
   */
  CreateUsagePlanAsync(
    name: string,
    description: string,
    apiStages: APIGateway.ApiStage[],
    quota?: APIGateway.QuotaSettings,
    throttle?: APIGateway.ThrottleSettings,
  ): Promise<APIGateway.UsagePlan>;

  /**
   * Create an usage plan key
   * @param keyId {string} ID of usage plan key
   * @param keyType {string} Type of key to create
   * @param usagePlanId {string} Usage plan id to associate with
   */
  CreateUsagePlanKeyAsync(
    keyId: string,
    keyType: string,
    usagePlanId: string,
  ): Promise<APIGateway.UsagePlanKey>;

  /**
   * Delete an API key
   * @param apiKey {string} API key to delete
   */
  DeleteApiKeyAsync(apiKey: string): Promise<object>;

  /**
   * Delete an usage plan
   * @param usagePlanId {string} Usage plan to delete
   */
  DeleteUsagePlanAsync(usagePlanId: string): Promise<object>;

  /**
   * Delete an usage plan key
   * @param keyId {string} Key to delete
   * @param usagePlanId {string} Usage plan that is associated with this key
   */
  DeleteUsagePlanKeyAsync(keyId: string, usagePlanId: string): Promise<object>;

  /**
   * Get an API key
   * @param apiKey {string} API Key
   */
  GetApiKeyAsync(apiKey: string): Promise<APIGateway.ApiKey>;
}
