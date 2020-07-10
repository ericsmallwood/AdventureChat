import {injectable} from 'inversify';
import ICampaignDao from '../ICampaignDao';
import {connection} from '../../db';
import Campaign from '../../models/Campaign';

@injectable()
export class CampaignMySqlDao implements ICampaignDao {
    public create(data: Campaign): Promise<Campaign> {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO campaigns 
                (name, image, gm, code) 
                values 
                ('${data.name})', '${data.image}', '${data.gm}', '${data.code}'`;

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
            connection.query(`DELETE FROM campaigns WHERE id='${id}'`, (err: any, result: any) => {
               if(err) {
                   return reject(err);
               }
               console.log('test');

               resolve(result);
            });
        });
    }

    public get(id: number): Promise<Campaign> {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM campaigns where id = '${id}' limit 1`, (err: any, result: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(result.length === 0 ? null : result[0]);
            });
        });
    }

    public getMany(id: number): Promise<Campaign[]> {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users where gm = '${id}' limit 1`, (err: any, result: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }

    public update(id: number, data: Campaign): Promise<any> {
        return new Promise((resolve, reject) => {
            connection
                .query(
                    `
                        UPDATE campaigns
                        SET 
                            name='${data.name}', 
                            image='${data.image}', 
                            gm='${data.gm}', 
                            code='${data.code}'
                        WHERE id = '${id}' 
                    `,
                    (err: any, result: any, fields: any) => {
                        if(err) {
                            return reject(err);
                        }

                        resolve(result.length === 0 ? null : result[0]);
                    });
        });
    }
}
