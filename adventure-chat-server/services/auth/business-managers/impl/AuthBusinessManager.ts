import {inject, injectable} from 'inversify';
import {v4 as uuidv4} from 'uuid';
import IAuthBusinessManager from '../IAuthBusinessManager';
import IAuthDataManager from '../../data-managers/IAuthDataManager';
import {TYPES} from '../../types';
import Errors from '../../constants';
const crypto = require('crypto');


@injectable()
export default class AuthBusinessManager implements IAuthBusinessManager {
    public _authDataManager: IAuthDataManager;
    public crypto = crypto;

    public constructor(
        @inject(TYPES.AuthDataObject) authDataManager: IAuthDataManager
    ) {
        this._authDataManager = authDataManager;
    }

    public login(user: any, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!user.confirmed) {
                return reject(Errors.NOT_CONFIRMED);
            }

            const hash = this.crypto.createHash('sha256').update(password).digest('hex');
            let user_login: any;
            this._authDataManager
                .login(user.id, hash)
                .then(result => {
                    user_login = result;
                    return this.updateToken(user.id);
                })
                .then(result => {
                    resolve({user, result});
                })
                .catch(error => reject(error));
        });
    }

    public updateToken(userid: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const token = uuidv4();
            this._authDataManager
                .updateToken(userid, token)
                .then(() => resolve({token}))
                .catch(error => reject(error));
        });
    }

    public authorize(token: string): Promise<any> {
        return this._authDataManager.authorize(token);
    }

    public createUserLogin(id: number, password: string): Promise<any> {
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        const token = uuidv4();
        return new Promise((resolve, reject) => {
            this._authDataManager
                .createUserLogin({id, token, hash})
                .then(() => resolve({token}))
                .catch(error => reject(error));
        });
    }

}
