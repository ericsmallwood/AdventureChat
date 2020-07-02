"use strict";
import { ServiceSchema } from "moleculer";
import {container} from './inversify.config';
import {TYPES} from "./types";
import UserLoginsBusinessManager from "./business-managers/impl/UserLoginsBusinessManager";

const userLoginsBusinessManager = container.get<UserLoginsBusinessManager>(TYPES.UserLoginsBusinessManager);

const AuthService: ServiceSchema = {
    name: "auth",
    actions: {
        login(ctx) {
            return new Promise((resolve, reject) => {
                userLoginsBusinessManager.login(ctx.params.username, ctx.params.password)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        authorize(ctx) {
            return new Promise((resolve, reject) => {
                userLoginsBusinessManager
                    .authorize(ctx.params.token)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        createUserLogin(ctx) {
            return new Promise((resolve, reject) => {
               userLoginsBusinessManager
                   .createUserLogin(ctx.params.id, ctx.params.password)
                   .then(result => resolve(result))
                   .catch(error => reject(error));
            });
        }
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
