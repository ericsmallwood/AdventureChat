import {container} from '../inversify.config';
import CampaignBusinessManager from '../business-managers/impl/CampaignBusinessManager';
import {TYPES} from '../types';

const campaignBusinessManager = container.get<CampaignBusinessManager>(TYPES.CampaignBusinessManager);

export default {
    createCampaign(ctx: any) {
        return new Promise((resolve, reject) => {
            campaignBusinessManager
                .protectedCreate(ctx.params.campaign, ctx.params.userId)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
    editCampaign(ctx: any) {
        return new Promise((resolve, reject) => {
            campaignBusinessManager
                .protectedUpdate(ctx.params.id, ctx.params.campaign, ctx.params.userId)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
    deleteCampaign(ctx: any) {
        return new Promise((resolve, reject) => {
            campaignBusinessManager
                .protectedDelete(ctx.params.id, ctx.params.userId)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
    getCampaign(ctx: any) {
        return new Promise((resolve, reject) => {
            campaignBusinessManager
                .get(ctx.params.id)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
    getCampaigns(ctx: any) {
        return new Promise((resolve, reject) => {
            campaignBusinessManager
                .getMany(ctx.params.id)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    },
};
