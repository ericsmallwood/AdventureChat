"use strict";
import { ServiceSchema } from "moleculer";
import {container} from './inversify.config';
import {TYPES} from "./types";
// import AuthBusinessManager from "./business-managers/impl/AuthBusinessManager";

// const authBusinessManager = container.get<AuthBusinessManager>(TYPES.AuthBusinessManager);

const ChatService: ServiceSchema = {
    name: "chat",
    actions: {

        createCampaign(ctx) {
            return new Promise((resolve, reject) => {
               // authBusinessManager
               //     .createUserLogin(ctx.params.id, ctx.params.password)
               //     .then(result => resolve(result))
               //     .catch(error => reject(error));
            });
        },
        editCampaign(ctx) {
            return new Promise((resolve, reject) => {
                // authBusinessManager
                //     .createUserLogin(ctx.params.id, ctx.params.password)
                //     .then(result => resolve(result))
                //     .catch(error => reject(error));
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

export = ChatService;
