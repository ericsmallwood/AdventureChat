import { ServiceSchema } from 'moleculer';
import ApiGateway = require('moleculer-web');
import Campaign from './models/Campaign';
const E = require('moleculer-web').Errors;

const ChatApiService: ServiceSchema = {
    name: 'chat-api',

    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3003,

        // Global CORS settings for all routes
        cors: {
            origin: '*',
            methods: '*',
            allowedHeaders: '*',
        },

        routes: [
            {
                path: '/campaign',
                authorization: true,
                whitelist: [
                    '**',
                ],
                aliases: {
                    'POST /'(req: any, res: any) {
                        let user: any;
                        req.$ctx
                            .call('chat.createCampaign', {campaign: req.$params.campaign, userId: req.$ctx.meta.userId})
                            .then((campaign: Campaign) => {
                                res.end(JSON.stringify({campaign}));
                            })
                            .catch((error: any) => {
                                res.writeHead(400);
                                res.end(JSON.stringify({error: 'Incorrect Login'}));
                            });
                    },
                    'PUT /:id'(req: any, res: any) {
                        req.$ctx
                            .call('create.editCampaign', {
                                id: req.$params.campaignId,
                                campaign: req.$params.campaign,
                                userId: req.$ctx.meta.userId,
                            })
                            .then((result: any) => {
                                res.end(JSON.stringify({response: 'OK'}));
                            })
                            .catch((error: any) => {
                                res.writeHead(400);
                                res.end(JSON.stringify({error: 'Incorrect Login'}));
                            });
                    },
                    'DELETE /:id'(req: any, res: any) {
                        req.$ctx
                            .call('create.deleteCampaign', {id: req.$params.id})
                            .then((result: any) => {
                                res.end();
                            })
                            .catch((error: any) => {
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
                            .catch((error: any) => {
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
                            .catch((error: any) => {
                                res.writeHead(400);
                                res.end(JSON.stringify({error: 'Incorrect Login'}));
                            });
                    },
                },
            },

        ],
    },
    methods: {
        authorize(ctx, route, req, res) {
            const auth = req.headers.authorization;

            if (auth && auth.startsWith('Bearer')) {
                const token = auth.slice(7);

                ctx.call('auth.authorize', {token}).then((result: any) => {
                    if(result) {
                        ctx.meta.userId = result.id;
                        return Promise.resolve(ctx);
                    }

                    return Promise.reject(new E.UnAuthorizedError(E.ERR_INVALID_TOKEN));
                });
            }
        },
    },
};

export = ChatApiService;
