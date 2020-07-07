import IRestBase from "./IRestBase";

export default interface IUsersBase extends IRestBase {
    getByUsername(username: string): Promise<any>;
    getByConfirmationCode(confirmationCode: string): Promise<any>;
}
