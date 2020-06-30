[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# adventure-chat-server

## NPM scripts
- `npm run dev` - Start development mode (load all services locally with hot-reload & REPL)
- `npm run build`- Uses typescript to transpile service to javascript
- `npm start` - Start production mode (set `SERVICES` env variable to load certain services) (previous build needed)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint` - Run ESLint
- `npm run ci` - Run continuous test mode with watching
- `npm test` - Run tests & generate coverage report

## General Setup
- install typescript
- install and run mysql
- import database, table, and data scripts from adventure-chat-db folder
- run command `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'` in mysql
- run command `flush privileges` in mysql
- install and run NATS (https://nats.io/download/nats-io/nats-server/)
- create config.ts file for each service folders at the root of the folder.
- npm run dev
