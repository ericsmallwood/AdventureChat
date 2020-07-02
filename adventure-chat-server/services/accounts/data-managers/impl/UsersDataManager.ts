import IUsersDataManager from "../IUsersDataManager";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import IUsersDao from "../../data-objects/IUsersDao";

@injectable()
export class UsersDataManager implements IUsersDataManager {
    private _usersDao: IUsersDao;

    constructor(@inject(TYPES.UsersDataObject) usersDao: IUsersDao) {
        this._usersDao = usersDao;
    }

    create(data: any): Promise<any> {
        return this._usersDao.create(data);
    }

    delete(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    get(id: string): Promise<any> {
        return this._usersDao.get(id);
    }

    getMany(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    update(id: string, data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    getByUsername(username: string): Promise<any> {
        return this._usersDao.getByUsername(username);
    }

}
