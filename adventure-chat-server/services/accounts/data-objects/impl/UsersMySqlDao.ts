import IUsersDao from "../IUsersDao";
import {injectable} from "inversify";
import * as mysql from 'mysql';
import {mysqlLogin} from "../../config";
@injectable()
export class UsersMySqlDao implements IUsersDao {
    connection: any;

    constructor() {
        this.connection = mysql.createConnection(mysqlLogin);
        this.connection.connect();
    }


    create(data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    delete(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM users where id = '${id}'`, (err: any, result: any, fields: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            });
        })
    }

    getMany(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    update(id: string, data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}
