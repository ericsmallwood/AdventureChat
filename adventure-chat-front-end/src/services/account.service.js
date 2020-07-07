import {AUTH_API_URI, ACCOUNTS_API_URI} from "../config";

export class AccountService {
    static login (username, password) {
        return new Promise((resolve, reject) => {
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

    static register(userData) {
        return new Promise((resolve, reject) => {
            fetch(`${ACCOUNTS_API_URI}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    static confirmRegistration(code) {
        return new Promise((resolve, reject) => {
            fetch(`${ACCOUNTS_API_URI}confirmation`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code: code})
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
