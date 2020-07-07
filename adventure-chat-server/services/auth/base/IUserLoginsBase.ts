export default interface IUserLoginsBase {
    login(userid: number, hash: string): Promise<any>;
    updateToken(userid: number, token: string): Promise<any>;
    authorize(token: string): Promise<any>;
    createUserLogin(userLogin: any): Promise<any>;
}
