import {inject, injectable} from "inversify";
import IUserLoginsBusinessManager from "../IUserLoginsBusinessManager";
import IUserLoginsDataManager from "../../data-managers/IUserLoginsDataManager";
import {TYPES} from "../../types";
import {SHA256} from "crypto-ts";
import {v4 as uuidv4} from 'uuid'


@injectable()
export default class UserLoginsBusinessManager implements IUserLoginsBusinessManager {
    private _userLoginsDataManager: IUserLoginsDataManager;

    constructor(
        @inject(TYPES.UserLoginsDataObject) userLoginsDataManager: IUserLoginsDataManager
    ) {
        this._userLoginsDataManager = userLoginsDataManager;
    }

    login(username: string, password: string): Promise<any> {
        const hash = SHA256(password);
        return this._userLoginsDataManager.login(username, hash);
    }

    updateToken(userid: number): Promise<any> {
        const token = uuidv4();
        return this._userLoginsDataManager.updateToken(userid, token);
    }

    authenticate(token: string): Promise<any> {
        return this._userLoginsDataManager.authenticate(token);
    }

}
