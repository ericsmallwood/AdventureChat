import {inject, injectable} from 'inversify';
import ICharacterBusinessManager from '../ICharacterBusinessManager';
import ICharacterDataManager from '../../data-managers/ICharacterDataManager';
import {TYPES} from '../../types';
import Character from '../../models/Character';
import {CharacterType} from '../../models/CharacterType';
import Errors from '../../constants';

@injectable()
export default class CharacterBusinessManager implements ICharacterBusinessManager {
    private _characterDataManager: ICharacterDataManager;

    public constructor(
        @inject(TYPES.CharacterDataManager) characterDataManager: ICharacterDataManager
    ) {
        this._characterDataManager = characterDataManager;
    }

    public get(id: number): Promise<any> {
        return this._characterDataManager.get(id);
    }

    public getMany(id: number): Promise<any> {
        return this._characterDataManager.getMany(id);
    }

    public protectedCreate(data: Character, userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!data.user_id || !data.first_name) {
                return reject({error: Errors.MISSING_PARAMETERS});
            }

           if (data.user_id !== userId) {
               return reject({error: Errors.cannotAlter('Character')});
           }

           data.type = CharacterType.Character;

           this._characterDataManager.create(data)
               .then((result: any) => resolve(result))
               .catch((error: any) => reject(error));
        });
    }

    public protectedDelete(id: number, userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.verifyUser(id, userId)
                .then(() => this._characterDataManager.delete(id))
                .then(() => resolve())
                .catch((error: any) => reject(error));
        });
    }

    public protectedUpdate(id: number, data: Character, userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.verifyUser(id, userId)
                .then(() => this._characterDataManager.delete(id))
                .then(() => resolve())
                .catch((error: any) => reject(error));
        });
    }

    public verifyUser(id: number, userId: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this._characterDataManager
                .get(id)
                .then((result: Character) => {
                    if(result.user_id === userId) {
                        return resolve();
                    }

                    reject({error: Errors.cannotAlter('Character')});
                });
        });
    }
}
