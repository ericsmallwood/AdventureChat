import {inject, injectable} from "inversify";
import IUserLoginsDataManager from "../IUserLoginsDataManager";
import IUserLoginsDao from "../../data-objects/IUserLoginsDao";
import {TYPES} from "../../types";

injectable()
export default class UserLoginsDataManager implements IUserLoginsDataManager {
    private _userLoginsDao: IUserLoginsDao;

    constructor(
        @inject(TYPES.UserLoginsDataObject) userLoginsDao: IUserLoginsDao
    ) {
        this._userLoginsDao = userLoginsDao;
    }

    login(userid: number, hash: string): Promise<any> {
        return this._userLoginsDao.login(userid, hash);
    }

    updateToken(userid: number, token: string): Promise<any> {
        return this._userLoginsDao.updateToken(userid, token);
    }

    authorize(token: string): Promise<any> {
        return this._userLoginsDao.authorize(token);
    }

    createUserLogin(userLogin: any): Promise<any> {
        return this._userLoginsDao.createUserLogin(userLogin);
    }
}
