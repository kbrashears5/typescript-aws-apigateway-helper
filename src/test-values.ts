import * as APIGateway from '@aws-sdk/client-api-gateway';

/**
 * Test values
 */
export class TestingValues {
    // descriptions
    public AWSError: string = 'AWS Error';
    public InvalidTest: string = 'returns error from AWS';
    public MustSupply: string = 'Must supply';
    public ThrowsOnEmpty: string = 'throws on empty';
    public ValidTest: string = 'returns valid response from AWS';

    // empty values
    public EmptyArray = [];
    public EmptyObject = {};
    public EmptyString: string = '';

    // strings
    public Description: string = 'description';
    public Name: string = 'name';
    public Key: string = 'key';
    public StringValue: string = 'value';
    public UsagePlanId: string = 'usage-plan-id';

    // objects
    public ApiStageArray: APIGateway.ApiStage[] = [{ apiId: this.StringValue }];
}
