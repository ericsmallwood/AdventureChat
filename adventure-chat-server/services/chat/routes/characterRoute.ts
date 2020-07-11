import Campaign from '../models/Campaign';

export default {
    path: '/characters',
    authorization: true,
    whitelist: [
        '**',
    ],
    aliases: {
        'POST /'(req: any, res: any) {
            req.$ctx
                .call('chat.createCharacter', {
                    campaign: req.$params.character,
                    userId: req.$ctx.meta.userId,
                })
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
                .call('create.editCharacter', {
                    id: req.$params.id,
                    character: req.$params.character,
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
                .call('create.deleteCharacter', {id: req.$params.id})
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
                .call('create.getCharacter', {id: req.$params.id})
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
                .call('create.getCharacters', {id: req.$params.id})
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
