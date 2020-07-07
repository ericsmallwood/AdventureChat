import IUsersBusinessManger from "../IUsersBusinessManger";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import IUsersDataManager from "../../data-managers/IUsersDataManager";
import IEmailBusinessManager from "../IEmailBusinessManager";
import {frontEndUrl} from "../../config";
const randomstring = require("randomstring");

@injectable()
export class UsersBusinessManager implements IUsersBusinessManger {
    private _userDataManager: IUsersDataManager;
    private _emailBusinessManager: IEmailBusinessManager;

    constructor(
        @inject(TYPES.UsersDataManager) userDataManager: IUsersDataManager,
        @inject(TYPES.EmailBusinessManager) emailBusinessManager: IEmailBusinessManager
    ) {
        this._userDataManager = userDataManager;
        this._emailBusinessManager = emailBusinessManager;
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            data.confirmation_code = randomstring.generate(7);
            let newUser: any;
            this._userDataManager
                .create(data)
                .then((result: any) => {
                    newUser = result;
                    return this._emailBusinessManager.send(
                        data.email,
                        'AdventrueChat Registration Confirmation',
                        `Confirm registration by clicking this link: 
                                <a href="${frontEndUrl}/confirmation/${data.confirmation_code}">
                                    Complete Registration
                                </a>
                            `
                    );
                })
                .then(() => {
                    resolve(newUser);
                })
                .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    get(id: string): Promise<any> {
        return this._userDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    update(id: string, data: any): Promise<any> {
        return this._userDataManager.update(id, data);
    }

    getByUsername(username: string): Promise<any> {
        return this._userDataManager.getByUsername(username);
    }

    confirmAccount(code: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getByConfirmationCode(code)
                .then((user: any) => {
                    user.confirmed = 1;
                    return this.update(user.id, user);
                })
                .then(() => resolve())
                .catch((error: any) => reject(error));
        });
    }

    getByConfirmationCode(confirmationCode: string): Promise<any> {
        return this._userDataManager.getByConfirmationCode(confirmationCode);
    }

}
