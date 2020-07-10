'use strict';
import { ServiceSchema } from 'moleculer';
import {container} from './inversify.config';
import {TYPES} from './types';
import CampaignBusinessManager from './business-managers/impl/CampaignBusinessManager';

const campaignBusinessManager = container.get<CampaignBusinessManager>(TYPES.CampaignBusinessManager);

const ChatService: ServiceSchema = {
    name: 'chat',
    actions: {

        createCampaign(ctx) {
            return new Promise((resolve, reject) => {
               campaignBusinessManager
                   .protectedCreate(ctx.params.campaign, ctx.params.userId)
                   .then(result => resolve(result))
                   .catch(error => reject(error));
            });
        },
        editCampaign(ctx) {
            return new Promise((resolve, reject) => {
                campaignBusinessManager
                    .protectedUpdate(ctx.params.id, ctx.params.campaign, ctx.params.userId)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        deleteCampaign(ctx) {
            return new Promise((resolve, reject) => {
                campaignBusinessManager
                    .protectedDelete(ctx.params.id, ctx.params.userId)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        getCampaign(ctx) {
            return new Promise((resolve, reject) => {
                campaignBusinessManager
                    .get(ctx.params.id)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            });
        },
        getCampaigns(ctx) {
            return new Promise((resolve, reject) => {
                campaignBusinessManager
                    .getMany(ctx.params.id)
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

export = ChatService;
