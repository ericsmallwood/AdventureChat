import IUserLoginsBase from "../base-impls/IUserLoginsBase";

export default interface IUserLoginsBusinessManager {
    login(username: string, password: string): Promise<any>;
    updateToken(userid: number): Promise<any>;
    authenticate(token: string): Promise<any>;
}
