import Campaign from '../models/Campaign';

export default interface IProtectedBase {
    protectedCreate(data: Campaign, userId: number): Promise<any>;
    protectedUpdate(id: number, data: Campaign, userId: number): Promise<any>;
    protectedDelete(id: number, userId: number): Promise<any>;
    verifyUser(campaignId: number, userId: number, checkCharacterUsers: boolean): Promise<any>;
}
