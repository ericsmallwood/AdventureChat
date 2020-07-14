import {injectable} from 'inversify';
import IUsersDao from '../../data-objects/IUsersDao';
import User from '../../models/user';

@injectable()
export default class UserMockDao implements IUsersDao {
    public users: User[] = [];

    public create(data: User): Promise<any> {
        return new Promise(resolve => {
            data.id = this.users.length + 1;
            this.users.push(data);
            resolve(data);
        });
    }

    public delete(id: number): Promise<any> {
        return new Promise(resolve => {
            const index = this.users.findIndex(user => user.id === id);
            this.users.splice(index, 1);
            resolve('Ok');
        });
    }

    public get(id: number): Promise<any> {
        return new Promise(resolve => {
            const user: User = this.users.find(u => u.id === id);
            resolve(user);
        });
    }

    public getByConfirmationCode(confirmationCode: string): Promise<any> {
        return new Promise(resolve => {
            const user: User = this.users.find(u => u.confirmation_code === confirmationCode);
            resolve(user);
        });
    }

    public getByUsername(username: string): Promise<any> {
        return new Promise(resolve => {
            const user: User = this.users.find(u => u.username === username);
            resolve(user);
        });
    }

    public getMany(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            reject(undefined);
        });
    }

    public update(id: number, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const index = this.users.findIndex(user => user.id === id);
            if (index >= 0) {
                this.users.splice(index, 1, data);
                return resolve('Ok');
            }

            reject('Not Found');
        });
    }

}
