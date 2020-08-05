import * as mysql from 'mysql';
import {mysqlLogin} from './config';

export let connection: any = null;

function handleDisconnect() {
    if(connection) {
        connection.end();
    }

    connection = mysql.createConnection(mysqlLogin);

    connection.connect((err: any) => {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', (err: any) => {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });

    setInterval(() => {
        console.log('mysql heartbeat chat service');
        connection.query('SELECT 1');
    }, 60000);
}

handleDisconnect();

