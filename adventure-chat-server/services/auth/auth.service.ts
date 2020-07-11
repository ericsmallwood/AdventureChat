'use strict';
import { ServiceSchema } from 'moleculer';
import {container} from './inversify.config';
import {TYPES} from './types';
import AuthBusinessManager from './business-managers/impl/AuthBusinessManager';

const authBusinessManager = container.get<AuthBusinessManager>(TYPES.AuthBusinessManager);

const AuthService: ServiceSchema = {
    name: 'auth',
    actions: {
        login(ctx) {
            return new Promise((resolve, reject) => {
                authBusinessManager.login(ctx.params.username, ctx.params.password)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        authorize(ctx) {
            return new Promise((resolve, reject) => {
                authBusinessManager
                    .authorize(ctx.params.token)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        createUserLogin(ctx) {
            return new Promise((resolve, reject) => {
               authBusinessManager
                   .createUserLogin(ctx.params.id, ctx.params.password)
                   .then(result => resolve(result))
                   .catch(error => reject(error));
            });
        },
    },

    /**
     * Events
     */
    events: {

    },

    /**
     * Methods
     */
    methods: {

    },
};

export = AuthService;
