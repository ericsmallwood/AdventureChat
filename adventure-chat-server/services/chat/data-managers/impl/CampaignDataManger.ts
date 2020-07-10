import {inject, injectable} from 'inversify';
import ICampaignDataManager from '../ICampaignDataManager';
import ICampaignDao from '../../data-objects/ICampaignDao';
import {TYPES} from '../../types';
import Campaign from '../../models/Campaign';

@injectable()
export default class CampaignDataManger implements ICampaignDataManager {
    private _campaignDao: ICampaignDao;

    public constructor(
        @inject(TYPES.CampaignDataObject) campaignDao: ICampaignDao
    ) {
        this._campaignDao = campaignDao;
    }

    public create(data: Campaign): Promise<Campaign> {
        return this._campaignDao.create(data);
    }

    public delete(id: number): Promise<any> {
        return this._campaignDao.delete(id);
    }

    public get(id: number): Promise<Campaign> {
        return this._campaignDao.get(id);
    }

    public getMany(id: number): Promise<Campaign[]> {
        return this._campaignDao.getMany(id);
    }

    public update(id: number, data: Campaign): Promise<any> {
        return this._campaignDao.update(id, data);
    }

}
