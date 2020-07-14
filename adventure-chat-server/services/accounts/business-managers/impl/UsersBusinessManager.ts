import {inject, injectable} from 'inversify';
import IUsersBusinessManger from '../IUsersBusinessManger';
import {TYPES} from '../../types';
import IUsersDataManager from '../../data-managers/IUsersDataManager';
import IEmailBusinessManager from '../IEmailBusinessManager';
import {frontEndUrl} from '../../config';
import User from '../../models/user';
const randomstring = require('randomstring');

@injectable()
export class UsersBusinessManager implements IUsersBusinessManger {
    public codeLength = 7;

    private _userDataManager: IUsersDataManager;
    private _emailBusinessManager: IEmailBusinessManager;

    public constructor(
        @inject(TYPES.UsersDataManager) userDataManager: IUsersDataManager,
        @inject(TYPES.EmailBusinessManager) emailBusinessManager: IEmailBusinessManager
    ) {
        this._userDataManager = userDataManager;
        this._emailBusinessManager = emailBusinessManager;
    }

    public create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            data.confirmation_code = randomstring.generate(this.codeLength);
            let newUser: any;
            this._userDataManager
                .create(data)
                .then((result: any) => {
                    newUser = result;
                    return this.sendEmail(data.email, data.confirmation_code);
                })
                .then(() => {
                    resolve(newUser);
                })
                .catch((error: any) => reject(error));
        });
    }

    public delete(id: number): Promise<any> {
        return this._userDataManager.delete(id);
    }

    public get(id: number): Promise<any> {
        return this._userDataManager.get(id);
    }

    public getMany(id: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    public update(id: number, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._userDataManager
                .update(id, data)
                .then(() => this._userDataManager.get(id))
                .then((user: User) => resolve(user))
                .catch((error: any) => reject(error));
        });
    }

    public getByUsername(username: string): Promise<any> {
        return this._userDataManager.getByUsername(username);
    }

    public confirmAccount(code: string): Promise<any> {
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

    public getByConfirmationCode(confirmationCode: string): Promise<any> {
        return this._userDataManager.getByConfirmationCode(confirmationCode);
    }

    public sendEmail(email: string, confirmation_code: string): Promise<any> {
        return this._emailBusinessManager.send(
            email,
            'AdventrueChat Registration Confirmation',
            `Confirm registration by clicking this link: 
                                <a href="${frontEndUrl}/confirmation/${confirmation_code}">
                                    Complete Registration
                                </a>
                            `
        );
    }

}
