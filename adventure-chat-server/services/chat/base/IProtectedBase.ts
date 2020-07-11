import Campaign from '../models/Campaign';

export default interface IProtectedBase<T> {
    protectedCreate(data: T, userId: number): Promise<any>;
    protectedUpdate(id: number, data: T, userId: number): Promise<any>;
    protectedDelete(id: number, userId: number): Promise<any>;
    verifyUser(id: number, userId: number): Promise<any>;
}
