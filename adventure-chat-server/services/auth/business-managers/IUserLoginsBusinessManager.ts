import IUserLoginsBase from "../base/IUserLoginsBase";

export default interface IUserLoginsBusinessManager {
    login(userid: number, password: string): Promise<any>;
    updateToken(userid: number): Promise<any>;
    authorize(token: string): Promise<any>;
    createUserLogin(id: string, password: string): Promise<any>;
}
