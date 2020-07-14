import {container} from '../inversify.config';
import {container as testContainer} from '../tests/inversify.config';
import {UsersBusinessManager} from '../business-managers/impl/UsersBusinessManager';
import {TYPES} from '../types';

export default ((isTest: boolean) => {
    const usersBusinessManager = isTest
        ? testContainer.get<UsersBusinessManager>(TYPES.UsersBusinessManager)
        : container.get<UsersBusinessManager>(TYPES.UsersBusinessManager);

    return {
        getByUsername(ctx: any) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.getByUsername(ctx.params.username)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        getUser(ctx: any) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.get(ctx.params.id)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        updateUser(ctx: any) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.update(ctx.params.id, ctx.params.user)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        createUser(ctx: any) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.create(ctx.params.user)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        deleteUser(ctx: any) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.delete(ctx.params.id)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        confirmUser(ctx: any) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.confirmAccount(ctx.params.code)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
    };
});
