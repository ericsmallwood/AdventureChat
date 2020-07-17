export default class Errors {
    public static NOT_AUTHORIZED = 'You are not authorized to complete this action.';
    public static MISSING_PARAMETERS = 'Missing Parameters.';
    public static SHOULD_FAIL = 'Succeeded when it should have failed.';
    public static SHOULD_SUCCEED: 'Failed when it should have succeeded.';
    public static ILLEGAL_FIELD: 'One of the fields cannot be updated';
    public static cannotBeEmpty = (fieldName: string) => `${fieldName} field cannot be null or empty.`;
    public static cannotAlter = (type: string) => `Cannot alter ${type} for another user`;
}
