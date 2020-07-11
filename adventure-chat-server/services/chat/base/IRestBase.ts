import Campaign from '../models/Campaign';

export default interface IRestBase<T> {
    create(data: T): Promise<any>;
    get(id: number): Promise<any>;
    getMany(id: number): Promise<any[]>;
    update(id: number, data: T): Promise<any>;
    delete(id: number): Promise<any>;
}
