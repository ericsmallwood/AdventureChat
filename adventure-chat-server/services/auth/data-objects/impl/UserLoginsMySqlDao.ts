import {injectable} from "inversify";
import IUserLoginsDao from "../IUserLoginsDao";
import * as mysql from "mysql";
import {mysqlLogin} from "../../config";

@injectable()
export default class UserLoginsMySqlDao implements IUserLoginsDao {
    connection: any;

    constructor() {
        this.connection = mysql.createConnection(mysqlLogin);
        this.connection.connect();
    }

    authorize(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
           const query = `SELECT * FROM user_logins where token = '${token}' limit 1`;
           this.connection.query(query, (err: any, result: any) => {
               if(err) {
                   return reject(err);
               }

               if(result.length === 0) {
                   return reject('not found');
               }

               resolve(result[0]);
           });
        });
    }

    login(userid: number, hash: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM user_logins where hash = '${hash}' and userid = ${userid} and confirmed = 1 limit 1`;
            this.connection.query(query, (err: any, result: any) => {
                if(err) {
                    return reject(err);
                }

                if(result.length === 0) {
                    return reject('not found');
                }

                resolve(result.length === 0 ? null : result[0]);
            });
        })
    }

    updateToken(userid: number, token: string) {
        return new Promise ((resolve, reject) => {
            const query = `UPDATE user_logins SET token = '${token}' WHERE userid = '${userid}'`;
            this.connection.query(query, (err: any, result: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            })
        });
    }

    createUserLogin(userLogin: any): Promise<any> {
        return new Promise ((resolve, reject) => {
            const query = `
                INSERT INTO user_logins 
                (userid, token, hash) 
                VALUES 
                ('${userLogin.id}', '${userLogin.token}', '${userLogin.hash}')
            `;

            this.connection.query(query, (err: any, result: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }
}
