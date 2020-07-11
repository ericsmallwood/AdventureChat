import {container} from '../inversify.config';
import CharacterBusinessManager from '../business-managers/impl/CharacterBusinessManager';
import {TYPES} from '../types';

const characterBusinessManager = container.get<CharacterBusinessManager>(TYPES.CharacterBusinessManager);

export default {
    createCharacter(ctx: any) {
        return new Promise((resolve, reject) => {
            characterBusinessManager
                .protectedCreate( ctx.params.character, ctx.params.userId)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
    editCharacter(ctx: any) {
        return new Promise((resolve, reject) => {
            characterBusinessManager
                .protectedUpdate(ctx.params.id, ctx.params.character, ctx.params.userId)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
    deleteCharacter(ctx: any) {
        return new Promise((resolve, reject) => {
            characterBusinessManager
                .protectedDelete(ctx.params.id, ctx.params.userId)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
    getCharacter(ctx: any) {
        return new Promise((resolve, reject) => {
            characterBusinessManager
                .get(ctx.params.id)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
    createCharacters(ctx: any) {
        return new Promise((resolve, reject) => {
            characterBusinessManager
                .getMany(ctx.params.id)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
};
