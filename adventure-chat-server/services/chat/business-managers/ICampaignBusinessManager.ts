import ICampaignBase from '../base/ICampaignBase';
import IProtectedBase from '../base/IProtectedBase';

export default interface ICampaignBusinessManager extends IProtectedBase {
    get(id: number): Promise<any>;
    getMany(id: number): Promise<any>;
}
