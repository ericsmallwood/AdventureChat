import {injectable} from 'inversify';
import moment = require('moment');
import IUsersDao from '../IUsersDao';
import {connection} from '../../db';

@injectable()
export class UsersMySqlDao implements IUsersDao {
    public create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO users 
                (firstname, lastname, birthday, email, confirmed, username, confirmation_code) 
                VALUES 
                (
                    '${data.firstname}', 
                    '${data.lastname}', 
                    '${moment(new Date(data.birthday)).format('YYYY-MM-DD').toString()}', 
                    '${data.email}', 
                    0, 
                    '${data.username}',
                    '${data.confirmation_code}'
                )
            `;
            connection.query(query, (err: any, result: any) => {
                if(err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    public delete(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM users where id=${id} limit 1`, (err: any, result: any, fields: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }

    public get(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users where id=${id} limit 1`, (err: any, result: any, fields: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(result.length === 0 ? null : result[0]);
            });
        });
    }

    public getByUsername(username: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users where username = '${username}' limit 1`;
            connection.query(query, (err: any, result: any, fields: any) => {
                if(err) {
                    return reject(err);
                }

                if(result.length === 0) {
                    return reject('user not found');
                }

                resolve(result.length === 0 ? null : result[0]);
            });
        });
    }

    public getMany(id: number): Promise<any> {
        return Promise.reject(undefined);
    }

    public update(id: number, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            connection
                .query(
                    `
                        UPDATE users 
                        SET 
                            firstname = '${data.firstname}', 
                            lastname='${data.lastname}', 
                            birthday='${moment(new Date(data.birthday)).format('YYYY-MM-DD').toString()}', 
                            email='${data.email}',
                            username='${data.username}',
                            confirmed=1
                        where id=${id} 
                    `,
                    (err: any, result: any, fields: any) => {
                        if(err) {
                            return reject(err);
                        }

                        resolve(result);
                    });
        });
    }

    public getByConfirmationCode(confirmationCode: string): Promise<any> {
        return new Promise((resolve, reject) => {
            connection
                .query(
                    `SELECT * FROM users where confirmation_code='${confirmationCode}' and confrimed=0 limit 1`,
                    (err: any, result: any, fields: any) => {
                        if(err) {
                            return reject(err);
                        }
                        if(result.length === 0) {
                            return reject('user with that confirmation code not found');
                        }
                        resolve(result.length === 0 ? null : result[0]);
             });
        });
    }
}
