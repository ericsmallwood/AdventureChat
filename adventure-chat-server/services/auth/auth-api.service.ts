import { ServiceSchema } from "moleculer";
import ApiGateway = require("moleculer-web");
import {container} from './inversify.config';
import {TYPES} from "./types";
import UserLoginsBusinessManager from "./business-managers/impl/UserLoginsBusinessManager";

const userLoginsBusinessManager = container.get<UserLoginsBusinessManager>(TYPES.UserLoginsBusinessManager);

const AuthApiService: ServiceSchema = {
    name: "auth-api",

    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3002,

        routes: [
            {
                path: "/login",
                whitelist: [
                    "**",
                ],
                aliases: {
                    "POST /"(req: any, res: any) {

                        req.$ctx
                            .call('accounts.getByUsername', {username: req.$params.username})
                            .then((result: any) => {
                                return req.$ctx.call('auth.login', {username: result.id, password: req.$params.password})
                            })
                            .then((result: any) => {
                                res.end(JSON.stringify(result));
                            })
                            .catch((error: any) => {
                                console.log(error);
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
