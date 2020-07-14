export default interface IRestBase {
    create(data: any): Promise<any>;
    get(id: number): Promise<any>;
    getMany(id: number): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
}
