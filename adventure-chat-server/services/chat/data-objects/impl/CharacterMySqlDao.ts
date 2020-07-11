import {injectable} from 'inversify';
import ICharacterDao from '../ICharacterDao';
import Character from '../../models/Character';
import {connection} from '../../db';

@injectable()
export default class CharacterMySqlDao implements ICharacterDao {
    public create(data: Character): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO characters
                (first_name, last_name, user_id, type, character_sheet_link)
                values
                (
                    '${data.first_name}', 
                    '${data.last_name}', 
                    ${data.user_id}, 
                    '${data.type}', 
                    '${data.character_sheet_link}'
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
            const query = `DELETE FROM characters WHERE id=${id}`;

            connection.query(query, (err: any, result: any) => {
               if (err) {
                  return reject(err);
               }

               resolve(result);
            });
        });
    }

    public get(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM characters WHERE id=${id}`;

            connection.query(query, (err: any, result: any) => {
                if (err) {
                    return reject(err);
                }

                resolve(result.length === 0 ? null : result[0]);
            });
        });
    }

    public getMany(id: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM characters WHERE user_id=${id}`;

            connection.query(query, (err: any, result: any) => {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }

    public update(id: number, data: Character): Promise<any> {
        return new Promise((resolve, reject) => {
           const query = `
                UPDATE characters 
                SET 
                    first_name='${data.first_name}', 
                    last_name='${data.last_name}',
                    character_sheet_length='${data.character_sheet_link}'
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
