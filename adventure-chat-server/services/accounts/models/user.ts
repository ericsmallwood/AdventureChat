export default class User {
    public id?: number;
    public firstname: string;
    public lastname: string;
    public birthday?: Date;
    public confirmed?: boolean;
    public username: string;
    public confirmation_code?: string;
    public email: string;
}
