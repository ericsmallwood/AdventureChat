import {container} from '../inversify.config';
import AuthBusinessManager from '../business-managers/impl/AuthBusinessManager';
import {TYPES} from '../types';

const authBusinessManager = container.get<AuthBusinessManager>(TYPES.AuthBusinessManager);

export default {
    login(ctx: any) {
        return new Promise((resolve, reject) => {
            authBusinessManager.login(ctx.params.username, ctx.params.password)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
    authorize(ctx: any) {
        return new Promise((resolve, reject) => {
            authBusinessManager
                .authorize(ctx.params.token)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
    createUserLogin(ctx: any) {
        return new Promise((resolve, reject) => {
            authBusinessManager
                .createUserLogin(ctx.params.id, ctx.params.password)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
};
