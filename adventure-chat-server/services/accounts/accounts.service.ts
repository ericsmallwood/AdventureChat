import { ServiceSchema } from "moleculer";
import ApiGateway = require("moleculer-web");
import {container} from './inversify.config';
import {TYPES} from "./types";
import {UsersBusinessManager} from "./business-managers/impl/UsersBusinessManager";

const usersBusinessManager = container.get<UsersBusinessManager>(TYPES.UsersBusinessManager);

const AccountsService: ServiceSchema = {
    name: "accounts",

    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3001,

        routes: [{
            path: "/accounts",
            whitelist: [
                "**",
            ],
            aliases: {
                "GET /"(req: any, res: any) {
                    usersBusinessManager
                        .get('1')
                        .then(result => {
                            res.end(JSON.stringify(result));
                        });
                },
            },
        }],
    },
};

export = AccountsService;
