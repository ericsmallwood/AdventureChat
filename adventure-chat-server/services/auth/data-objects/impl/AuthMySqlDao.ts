import {injectable} from "inversify";
import IAuthDao from "../IAuthDao";
import {connection} from '../../db';

@injectable()
export default class AuthMySqlDao implements IAuthDao {
    authorize(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
           const query = `SELECT * FROM user_logins where token = '${token}' limit 1`;
           connection.query(query, (err: any, result: any) => {
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
            connection.query(query, (err: any, result: any) => {
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
            connection.query(query, (err: any, result: any) => {
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

            connection.query(query, (err: any, result: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }
}
