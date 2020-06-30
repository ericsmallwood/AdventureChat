import { ServiceSchema } from "moleculer";
import ApiGateway = require("moleculer-web");
import {container} from './inversify.config';
import {TYPES} from "./types";
import UserLoginsBusinessManager from "./business-managers/impl/UserLoginsBusinessManager";

const userLoginsBusinessManager = container.get<UserLoginsBusinessManager>(TYPES.UserLoginsBusinessManager);

const AccountsService: ServiceSchema = {
    name: "auth",

    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3002,

        routes: [{
            path: "/auth",
            whitelist: [
                "**",
            ],
            aliases: {
                "POST /login"(req: any, res: any) {
                    userLoginsBusinessManager.login(req.body.username, req.body.password)
                        .then(result => {
                            res.end(JSON.stringify(result));
                        });
                },
                "POST /"(req: any, res: any) {
                    userLoginsBusinessManager.authenticate(req.body.token)
                        .then(result => {
                            res.end(JSON.stringify(result));
                        });
                },
            },
        }],
    },
};

export = AccountsService;
