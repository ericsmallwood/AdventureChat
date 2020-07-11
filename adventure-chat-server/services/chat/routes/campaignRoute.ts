import Campaign from '../models/Campaign';

export default {
    path: '/campaigns',
    authorization: true,
    whitelist: [
        '**',
    ],
    aliases: {
        'POST /'(req: any, res: any) {
            req.$ctx
                .call('chat.createCampaign', {campaign: req.$params.campaign, userId: req.$ctx.meta.userId})
                .then((campaign: Campaign) => {
                    res.end(JSON.stringify({campaign}));
                })
                .catch(() => {
                    res.writeHead(400);
                    res.end(JSON.stringify({error: 'Incorrect Login'}));
                });
        },
        'PUT /:id'(req: any, res: any) {
            req.$ctx
                .call('create.editCampaign', {
                    id: req.$params.id,
                    campaign: req.$params.campaign,
                    userId: req.$ctx.meta.userId,
                })
                .then(() => {
                    res.end(JSON.stringify({response: 'OK'}));
                })
                .catch(() => {
                    res.writeHead(400);
                    res.end(JSON.stringify({error: 'Incorrect Login'}));
                });
        },
        'DELETE /:id'(req: any, res: any) {
            req.$ctx
                .call('create.deleteCampaign', {id: req.$params.id})
                .then(() => {
                    res.end();
                })
                .catch(() => {
                    res.writeHead(400);
                    res.end(JSON.stringify({error: 'Incorrect Login'}));
                });
        },
        'GET /:id'(req: any, res: any) {
            req.$ctx
                .call('create.getCampaign', {id: req.$params.id})
                .then((result: any) => {
                    res.end(JSON.stringify(result));
                })
                .catch(() => {
                    res.writeHead(400);
                    res.end(JSON.stringify({error: 'Incorrect Login'}));
                });
        },
        'GET /all/:id'(req: any, res: any) {
            req.$ctx
                .call('create.getCampaigns', {id: req.$params.id})
                .then((result: any) => {
                    res.end(JSON.stringify(result));
                })
                .catch(() => {
                    res.writeHead(400);
                    res.end(JSON.stringify({error: 'Incorrect Login'}));
                });
        },
    },
};
