import IUsersBase from '../base/IUsersBase';

export default interface IUsersBusinessManger extends IUsersBase {
    confirmAccount(code: string): Promise<any>;
    sendEmail(email: string, confirmation_code: string): Promise<any>;
}
