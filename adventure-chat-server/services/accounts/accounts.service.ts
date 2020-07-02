"use strict";
import { ServiceSchema } from "moleculer";
import {container} from './inversify.config';
import {TYPES} from "./types";
import {UsersBusinessManager} from "./business-managers/impl/UsersBusinessManager";

const usersBusinessManager = container.get<UsersBusinessManager>(TYPES.UsersBusinessManager);

const AccountsService: ServiceSchema = {
    name: "accounts",
    actions: {
        getByUsername(ctx) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.getByUsername(ctx.params.username)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        getUser(ctx) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.get(ctx.params.id)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        updateUser(ctx) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.update(ctx.params.id, ctx.params.user)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        createUser(ctx) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.create(ctx.params.user)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        deleteUser(ctx) {
            return new Promise((resolve, reject) => {
                usersBusinessManager.delete(ctx.params.id)
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

export = AccountsService;
