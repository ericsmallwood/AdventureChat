import ICampaignBase from '../base/ICampaignBase';
import IProtectedBase from '../base/IProtectedBase';
import Campaign from '../models/Campaign';

export default interface ICampaignBusinessManager extends IProtectedBase<Campaign> {
    get(id: number): Promise<any>;
    getMany(id: number): Promise<any>;
    generateCode(): string;
}
