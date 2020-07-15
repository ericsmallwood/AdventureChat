import { ServiceSchema } from 'moleculer';
import ApiGateway = require('moleculer-web');

const AuthApiService: ServiceSchema = {
    name: 'auth-api',

    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3002,

        // Global CORS settings for all routes
        cors: {
            origin: '*',
            methods: '*',
            allowedHeaders: '*',
        },

        routes: [
            {
                path: '/login',
                whitelist: [
                    '**',
                ],
                aliases: {
                    'POST /'(req: any, res: any) {
                        req.$ctx
                            .call('auth.login', {username: req.$params.username, password: req.$params.password})
                            .then((result: any) => res.end(JSON.stringify(result)))
                            .catch((error: any) => {
                                res.writeHead(400);
                                res.end(JSON.stringify({error: error.message}));
                            });
                    },
                },
            },

        ],
    },
};

export = AuthApiService;
