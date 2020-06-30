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

    login(username: string, hash: string): Promise<any> {
        return this._userLoginsDao.login(username, hash);
    }

    updateToken(userid: number, token: string): Promise<any> {
        return this._userLoginsDao.updateToken(userid, token);
    }

    authenticate(token: string): Promise<any> {
        return this._userLoginsDao.authenticate(token);
    }
}
