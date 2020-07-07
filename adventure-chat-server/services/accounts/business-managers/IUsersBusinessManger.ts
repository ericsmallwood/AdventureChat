import IUsersBase from "../base/IUsersBase";

export default interface IUsersBusinessManger extends IUsersBase {
    confirmAccount(code: string): Promise<any>;
}
