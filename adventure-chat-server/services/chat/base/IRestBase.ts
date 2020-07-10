import Campaign from '../models/Campaign';

export default interface IRestBase {
    create(data: Campaign): Promise<any>;
    get(id: number): Promise<Campaign>;
    getMany(id: number): Promise<Campaign[]>;
    update(id: number, data: Campaign): Promise<any>;
    delete(id: number): Promise<any>;
}
