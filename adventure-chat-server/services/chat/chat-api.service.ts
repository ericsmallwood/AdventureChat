import { ServiceSchema } from "moleculer";
import ApiGateway = require("moleculer-web");
const E = require("moleculer-web").Errors;

const ChatApiService: ServiceSchema = {
    name: "chat-api",

    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3003,

        // Global CORS settings for all routes
        cors: {
            origin: "*",
            methods: '*',
            allowedHeaders: '*',
        },

        routes: [
            {
                path: "/campaign",
                authorization: true,
                whitelist: [
                    "**",
                ],
                aliases: {
                    "POST /"(req: any, res: any) {
                        let user: any;
                        req.$ctx
                            .call('chat.createCampaign', {campaign: req.$params.campaign})
                            .then((result: any) => {
                                res.end(JSON.stringify({user: user, token: result.token}));
                            })
                            .catch((error: any) => {
                                res.writeHead(400)
                                res.end(JSON.stringify({error: 'Incorrect Login'}));
                            })
                    },
                    "PUT /"(req: any, res: any) {
                        let user: any;
                        req.$ctx
                            .call('create.editCampaign', {campaignId: req.$params.campaignId, campaign: req.$params.campaign})
                            .then((result: any) => {
                                res.end(JSON.stringify({user: user, token: result.token}));
                            })
                            .catch((error: any) => {
                                res.writeHead(400)
                                res.end(JSON.stringify({error: 'Incorrect Login'}));
                            })
                    }
                },
            },

        ],
    },
    methods: {
        authorize(ctx, route, req, res) {
            let auth = req.headers['authorization'];

            if (auth && auth.startsWith("Bearer")) {
                let token = auth.slice(7);

                ctx.call('auth.authorize', {token: token}).then((result:any) => {
                    if(result) {
                        ctx.meta.user = { id: 1 };
                        return Promise.resolve(ctx);
                    }

                    return Promise.reject(new E.UnAuthorizedError(E.ERR_INVALID_TOKEN));
                });
            }
        }
    }
};

export = ChatApiService;
