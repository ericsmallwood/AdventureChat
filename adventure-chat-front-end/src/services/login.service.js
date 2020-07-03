import {AUTH_API_URI} from "../config";

export class LoginService {
    static login (username, password) {
        return new Promise((resolve, reject) => {
            console.log(AUTH_API_URI);
            fetch(`${AUTH_API_URI}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}
