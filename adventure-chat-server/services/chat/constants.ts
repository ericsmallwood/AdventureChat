export default class Errors {
    public static MISSING_PARAMETERS = 'Missing Parameters.';

    public static cannotAlter(type: string) {
        return `Cannot alter ${type} for another user`;
    }
}
