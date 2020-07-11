import {CharacterType} from './CharacterType';

export default class Character {
    public id: number;
    public first_name: string;
    public last_name: string;
    public user_id: number;
    public type: CharacterType;
    public character_sheet_link: string;
}
