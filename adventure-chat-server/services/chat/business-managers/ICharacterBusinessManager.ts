import ICharacterBase from '../base/ICharacterBase';
import IProtectedBase from '../base/IProtectedBase';
import Character from '../models/Character';

export default interface ICharacterBusinessManager extends IProtectedBase<Character> {
    get(id: number): Promise<any>;
    getMany(id: number): Promise<any>;
}
