import { ServiceSchema } from 'moleculer';
import ApiGateway = require('moleculer-web');
import Campaign from './models/Campaign';
import campaignRoute from './routes/campaignRoute';
import characterRoute from './routes/characterRoute';
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

        routes: [campaignRoute, characterRoute],
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
