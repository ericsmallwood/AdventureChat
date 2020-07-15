export default interface IAuthBusinessManager {
    login(user: any, password: string): Promise<any>;
    updateToken(userid: number): Promise<any>;
    authorize(token: string): Promise<any>;
    createUserLogin(id: number, password: string): Promise<any>;
}
