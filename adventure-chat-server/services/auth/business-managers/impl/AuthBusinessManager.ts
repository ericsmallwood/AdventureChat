import {inject, injectable} from 'inversify';
import {v4 as uuidv4} from 'uuid';
import IAuthBusinessManager from '../IAuthBusinessManager';
import IAuthDataManager from '../../data-managers/IAuthDataManager';
import {TYPES} from '../../types';
const crypto = require('crypto');


@injectable()
export default class AuthBusinessManager implements IAuthBusinessManager {
    private _authDataManager: IAuthDataManager;

    public constructor(
        @inject(TYPES.AuthDataObject) authDataManager: IAuthDataManager
    ) {
        this._authDataManager = authDataManager;
    }

    public login(userid: number, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256').update(password).digest('hex');
            let user: any;
            this._authDataManager
                .login(userid, hash)
                .then(result => {
                    user = result;
                    return this.updateToken(userid);
                })
                .then(result => {
                    resolve({id: user.id, ...result});
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

    public createUserLogin(id: string, password: string): Promise<any> {
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
