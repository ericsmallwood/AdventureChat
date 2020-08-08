import {inject, injectable} from 'inversify';
import IUsersDataManager from '../IUsersDataManager';
import {TYPES} from '../../types';
import IUsersDao from '../../data-objects/IUsersDao';

@injectable()
export class UsersDataManager implements IUsersDataManager {
    private _usersDao: IUsersDao;

    public constructor(@inject(TYPES.UsersDataObject) usersDao: IUsersDao) {
        this._usersDao = usersDao;
    }

    public create(data: any): Promise<any> {
        return this._usersDao.create(data);
    }

    public delete(id: number): Promise<any>  {
        return this._usersDao.delete(id);
    }

    public get(id: number): Promise<any> {
        return this._usersDao.get(id);
    }

    public getMany(id: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    public update(id: number, data: any): Promise<any> {
        return this._usersDao.update(id, data);
    }

    public getByUsername(username: string): Promise<any> {
        return this._usersDao.getByUsername(username);
    }

    public getByConfirmationCode(confirmationCode: string): Promise<any> {
        return this._usersDao.getByConfirmationCode(confirmationCode);
    }

}
