import * as mysql from 'mysql';
import {mysqlLogin} from './config';

export const connection: any = mysql.createConnection(mysqlLogin);

function handleDisconnect() {
    connection.connect((err: any) => {
        if(err) {
            console.log('error when connecting to db2:', err);
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
}

handleDisconnect();

