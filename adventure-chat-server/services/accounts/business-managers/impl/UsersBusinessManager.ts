import IUsersBusinessManger from "../IUsersBusinessManger";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import IUsersDataManager from "../../data-managers/IUsersDataManager";

@injectable()
export class UsersBusinessManager implements IUsersBusinessManger {
    private _userDataManager: IUsersDataManager;

    constructor(
        @inject(TYPES.UsersDataManager) userDataManager: IUsersDataManager
    ) {
        this._userDataManager = userDataManager;
    }

    create(data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    delete(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    get(id: string): Promise<any> {
        return this._userDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    update(id: string, data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}
