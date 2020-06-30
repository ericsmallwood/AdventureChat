import {injectable} from "inversify";
import IUserLoginsDao from "../IUserLoginsDao";
import * as mysql from "mysql";
import {mysqlLogin} from "../../../accounts/config";

@injectable()
export default class UserLoginsMySqlDao implements IUserLoginsDao {
    connection: any;

    constructor() {
        this.connection = mysql.createConnection(mysqlLogin);
        this.connection.connect();
    }

    authenticate(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
           const query = `SELECT * FROM user_logins where token = '${token}' limit 1`;
           this.connection.query(query, (err: any, result: any) => {
               if(err) {
                   return reject(err);
               }

               if(result.length === 0) {
                   return reject('not found');
               }

               resolve(result);
           });
        });
    }

    login(username:string, hash: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM user_logins where hash = '${hash}' and username = '${username}' limit 1`;
            this.connection.query(query, (err: any, result: any) => {
                if(err) {
                    return reject(err);
                }

                if(result.length === 0) {
                    return reject('not found');
                }

                resolve(result);
            });
        })
    }

    updateToken(userid: number, token: string) {
        return new Promise ((resolve, reject) => {
            const query = `UPDATE user_logins SET token = '${token}' WERE userid = '${userid}'`;
            this.connection.query(query, (err: any, result: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            })
        });
    }
}
