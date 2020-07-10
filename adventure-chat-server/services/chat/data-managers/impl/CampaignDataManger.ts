import {inject, injectable} from 'inversify';
import ICampaignDataManager from '../ICampaignDataManager';
import ICampaignDao from '../../data-objects/ICampaignDao';
import {TYPES} from '../../types';

@injectable()
export default class CampaignDataManger implements ICampaignDataManager {
    private _campaignDao: ICampaignDao;

    public constructor(
        @inject(TYPES.CampaignDataObject) campaignDao: ICampaignDao
    ) {
        this._campaignDao = campaignDao;
    }

    public create(data: any): Promise<any> {
        return this._campaignDao.create(data);
    }

    public delete(id: string): Promise<any> {
        return this._campaignDao.delete(id);
    }

    public get(id: string): Promise<any> {
        return this._campaignDao.get(id);
    }

    public getMany(id: string): Promise<any> {
        return this._campaignDao.getMany(id);
    }

    public update(id: string, data: any): Promise<any> {
        return this._campaignDao.update(id, data);
    }

}
