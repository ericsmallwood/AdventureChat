import {inject, injectable} from "inversify";
import IAuthDataManager from "../IAuthDataManager";
import IAuthDao from "../../data-objects/IAuthDao";
import {TYPES} from "../../types";

injectable()
export default class AuthDataManager implements IAuthDataManager {
    private _authDao: IAuthDao;

    constructor(
        @inject(TYPES.AuthDataObject) authDao: IAuthDao
    ) {
        this._authDao = authDao;
    }

    login(userid: number, hash: string): Promise<any> {
        return this._authDao.login(userid, hash);
    }

    updateToken(userid: number, token: string): Promise<any> {
        return this._authDao.updateToken(userid, token);
    }

    authorize(token: string): Promise<any> {
        return this._authDao.authorize(token);
    }

    createUserLogin(userLogin: any): Promise<any> {
        return this._authDao.createUserLogin(userLogin);
    }
}
