import { ServiceSchema } from "moleculer";
import ApiGateway = require("moleculer-web");

const AuthApiService: ServiceSchema = {
    name: "auth-api",

    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3002,

        // Global CORS settings for all routes
        cors: {
            origin: "*",
            methods: '*',
            allowedHeaders: '*',
        },

        routes: [
            {
                path: "/login",
                whitelist: [
                    "**",
                ],
                aliases: {
                    "POST /"(req: any, res: any) {
                        let user: any;
                        req.$ctx
                            .call('accounts.getByUsername', {username: req.$params.username})
                            .then((result: any) => {
                                user = result;
                                return req.$ctx.call('auth.login', {username: result.id, password: req.$params.password})
                            })
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
};

export = AuthApiService;
