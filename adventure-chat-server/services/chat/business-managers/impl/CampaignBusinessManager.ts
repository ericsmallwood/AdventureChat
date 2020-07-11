import {inject, injectable} from 'inversify';
import ICampaignBusinessManager from '../ICampaignBusinessManager';
import ICampaignDataManager from '../../data-managers/ICampaignDataManager';
import {TYPES} from '../../types';
import Campaign from '../../models/Campaign';
import Errors from '../../constants';
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
        const campaign = data as Campaign;
        return new Promise((resolve, reject) => {
            if (campaign.gm !== userId) {
                return reject({error: 'Cannot create campaign for another user'});
            }

            campaign.code = randomstring.generate(10);

            this._campaignDataManager.create(campaign)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    public protectedDelete(id: number, userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.verifyUser(id, userId)
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


    public getMany(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this._campaignDataManager.getMany(id)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    public protectedUpdate(id: number, data: Campaign, userId: number): Promise<any> {
        const campaign = data as Campaign;
        return new Promise((resolve, reject) => {
            this.verifyUser(id, userId)
                .then(() => this._campaignDataManager.update(id, campaign))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    public verifyUser(campaignId: number, userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
           this._campaignDataManager
               .get(campaignId)
               .then((result: Campaign) => {
                   if(result.gm === userId) {
                       return resolve();
                   }

                   reject({error: Errors.cannotAlter('Campaign')});
               });
        });
    }
}
