export default interface IUserLoginsBase {
    login(username: string, hash: string): Promise<any>;
    updateToken(userid: number, token: string): Promise<any>;
    authenticate(token: string): Promise<any>;
}
