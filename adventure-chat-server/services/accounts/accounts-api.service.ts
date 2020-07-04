import { ServiceSchema } from "moleculer";
import ApiGateway = require("moleculer-web");
const E = require("moleculer-web").Errors;


const AccountsApiService: ServiceSchema = {
    name: "accounts-api",

    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3001,

        // Global CORS settings for all routes
        cors: {
            origin: "*",
            methods: '*',
            allowedHeaders: '*',
        },

        routes: [
            {
                path: "/get",
                authorization: true,
                whitelist: [
                    "**",
                ],
                bodyParsers: {
                    json: true
                },
                aliases: {
                    "GET /:id"(req: any, res: any) {
                        req.$ctx.call("accounts.getUser", req.$params.id)
                            .then((result: any) => res.end(JSON.stringify(result)))
                            .catch((error: any) => {
                                res.writeHead(404)
                                res.end(JSON.stringify({error: 'Incorrect Login'}));
                            });
                    },
                },
            },
            {
                path: "/update",
                authorization: true,
                whitelist: [
                    "**",
                ],
                bodyParsers: {
                    json: true
                },
                aliases: {
                    "PUT /:id"(req: any, res: any) {
                        console.log(req);
                        req.$ctx.call("accounts.updateUser", {id: req.$params.id, user: req.$params.user})
                            .then((result: any) => res.end(JSON.stringify(result)))
                            .catch((error: any) => {
                                res.writeHead(404)
                                res.end(JSON.stringify({error: 'Incorrect Login'}));
                            });
                    },
                },
            },
            {
                path: "/register",
                whitelist: [
                    "**",
                ],
                bodyParsers: {
                    json: true
                },
                aliases: {
                    "POST /"(req: any, res: any) {
                        let newUser: any;
                        req.$ctx.call("accounts.createUser", {user: req.$params.user})
                            .then((result: any) => {
                                console.log(result);
                                return req.$ctx.call("accounts.getUser", {id: result.insertId});
                            })
                            .then((result: any) => {
                                newUser = result;
                                const userLogin = {id: result.id, password: req.$params.password}

                                return req.$ctx.call("auth.createUserLogin", userLogin);
                            })
                            .then((result: any) => {
                                res.end(JSON.stringify({...{user: newUser}, ...result}));
                            })
                            .catch((error: any) => {
                                res.writeHead(500)
                                res.end(JSON.stringify({error: 'Server Error'}));
                            });
                    },
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

export = AccountsApiService;
