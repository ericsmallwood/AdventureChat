import {inject, injectable} from 'inversify';
import ICampaignBusinessManager from '../ICampaignBusinessManager';
import ICampaignDataManager from '../../data-managers/ICampaignDataManager';
import {TYPES} from '../../types';
import Campaign from '../../models/Campaign';
const randomstring = require('randomstring');

@injectable()
export default class CampaignBusinessManager implements ICampaignBusinessManager {
    private _campaignDataManager: ICampaignDataManager;

    public constructor(
        @inject(TYPES.CampaignDataManager) campaignDataManager: ICampaignDataManager
    ) {
        this._campaignDataManager = campaignDataManager;
    }

    public protectedCreate(data: Campaign, userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            if (data.gm !== userId) {
                return reject({error: 'Cannot create campaign for another user'});
            }

            data.code = randomstring.generate(10);

            this._campaignDataManager.create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    public protectedDelete(id: number, userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.verifyUser(id, userId, false)
                .then(() => this._campaignDataManager.delete(id))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    public get(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this._campaignDataManager.get(id)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    public protectedUpdate(id: number, data: Campaign, userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.verifyUser(id, userId, true)
                .then(() => this._campaignDataManager.update(id, data))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    public verifyUser(campaignId: number, userId: number, checkCharacterUsers: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
           this._campaignDataManager
               .get(campaignId)
               .then((result: Campaign) => {
                   if(result.gm === userId) {
                       return resolve();
                   }

                   reject('You do not own this campaign.');
               });
        });
    }

}
