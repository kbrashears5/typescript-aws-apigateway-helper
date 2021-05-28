import * as APIGateway from '@aws-sdk/client-api-gateway';

/**
 * Test values
 */
export class TestingValues {
  // descriptions
  public AWSError = 'AWS Error';
  public InvalidTest = 'returns error from AWS';
  public MustSupply = 'Must supply';
  public ThrowsOnEmpty = 'throws on empty';
  public ValidTest = 'returns valid response from AWS';

  // empty values
  public EmptyArray = [];
  public EmptyObject = {};
  public EmptyString = '';

  // strings
  public Description = 'description';
  public Name = 'name';
  public Key = 'key';
  public StringValue = 'value';
  public UsagePlanId = 'usage-plan-id';

  // objects
  // eslint-disable-next-line no-invalid-this
  public ApiStageArray: APIGateway.ApiStage[] = [{ apiId: this.StringValue }];
}
