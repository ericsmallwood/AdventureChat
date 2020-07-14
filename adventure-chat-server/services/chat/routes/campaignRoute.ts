import Campaign from '../models/Campaign';

export default {
    path: '/campaigns',
    authorization: true,
    whitelist: [
        '**',
    ],
    aliases: {
        'POST /:id'(req: any, res: any) {
            console.log('create campaign route called');
            req.$ctx
                .call('chat.createCampaign', {campaign: req.$params.campaign, userId: req.$ctx.meta.userId})
                .then((campaign: Campaign) => {
                    res.end(JSON.stringify({campaign}));
                })
                .catch((error: any) => {
                    res.writeHead(400);
                    res.end(JSON.stringify({error: error.message}));
                });
        },
        'PUT /:id'(req: any, res: any) {
            console.log('update campaign route called');
            req.$ctx
                .call('chat.editCampaign', {
                    id: req.$params.id,
                    campaign: req.$params.campaign,
                    userId: req.$ctx.meta.userId,
                })
                .then(() => {
                    res.end(JSON.stringify({response: 'OK'}));
                })
                .catch((error: any) => {
                    res.writeHead(400);
                    res.end(JSON.stringify({error: error.message}));
                });
        },
        'DELETE /:id'(req: any, res: any) {
            console.log('deleting campaign');
            req.$ctx
                .call('chat.deleteCampaign', {id: req.$params.id})
                .then(() => {
                    res.end();
                })
                .catch((error: any) => {
                    res.writeHead(400);
                    res.end(JSON.stringify({error: error.message}));
                });
        },
        'GET /:id'(req: any, res: any) {

            req.$ctx
                .call('chat.getCampaign', {id: req.$params.id})
                .then((result: any) => {
                    res.end(JSON.stringify(result));
                })
                .catch((error: any) => {
                    res.writeHead(400);
                    res.end(JSON.stringify({error: error.message}));
                });
        },
        'GET /all/:id'(req: any, res: any) {
            req.$ctx
                .call('chat.getCampaigns', {id: req.$params.id})
                .then((result: any) => {
                    res.end(JSON.stringify(result));
                })
                .catch((error: any) => {
                    res.writeHead(400);
                    res.end(JSON.stringify({error: error.message}));
                });
        },
    },
};
