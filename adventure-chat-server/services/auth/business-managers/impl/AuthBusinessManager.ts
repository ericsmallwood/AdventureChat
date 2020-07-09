import {inject, injectable} from "inversify";
import IAuthBusinessManager from "../IAuthBusinessManager";
import IAuthDataManager from "../../data-managers/IAuthDataManager";
import {TYPES} from "../../types";
import {v4 as uuidv4} from 'uuid'
const crypto = require("crypto");


@injectable()
export default class AuthBusinessManager implements IAuthBusinessManager {
    private _authDataManager: IAuthDataManager;

    constructor(
        @inject(TYPES.AuthDataObject) authDataManager: IAuthDataManager
    ) {
        this._authDataManager = authDataManager;
    }

    login(userid: number, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash("sha256").update(password).digest("hex");
            let user: any;
            this._authDataManager
                .login(userid, hash)
                .then((result) => {
                    user = result;
                    return this.updateToken(userid);
                })
                .then(result => {
                    resolve({id: user.id, ...result})
                })
                .catch(error => reject(error));
        });
    }

    updateToken(userid: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const token = uuidv4();
            this._authDataManager
                .updateToken(userid, token)
                .then(() => resolve({token :token}))
                .catch(error => reject(error));
        })
    }

    authorize(token: string): Promise<any> {
        return this._authDataManager.authorize(token);
    }

    createUserLogin(id: string, password: string): Promise<any> {
        const hash = crypto.createHash("sha256").update(password).digest("hex");
        const token = uuidv4();
        return new Promise((resolve, reject) => {
            this._authDataManager
                .createUserLogin({id: id, token: token, hash: hash})
                .then(() => resolve({token :token}))
                .catch(error => reject(error));
        });
    }

}
