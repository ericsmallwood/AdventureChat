import {inject, injectable} from 'inversify';
import ICharacterDataManager from '../ICharacterDataManager';
import Character from '../../models/Character';
import ICharacterDao from '../../data-objects/ICharacterDao';
import {TYPES} from '../../types';

@injectable()
export default class CharacterDataManager implements ICharacterDataManager {
    private _characterDao: ICharacterDao;

    public constructor(
        @inject(TYPES.CharacterDataObject) characterDao: ICharacterDao
    ) {
        this._characterDao = characterDao;
    }

    public create(data: Character): Promise<any> {
        return this._characterDao.create(data);
    }

    public delete(id: number): Promise<any> {
        return this._characterDao.delete(id);
    }

    public get(id: number): Promise<any> {
        return this._characterDao.get(id);
    }

    public getMany(id: number): Promise<any[]> {
        return this._characterDao.getMany(id);
    }

    public update(id: number, data: any): Promise<any> {
        return this._characterDao.update(id, data);
    }

}
