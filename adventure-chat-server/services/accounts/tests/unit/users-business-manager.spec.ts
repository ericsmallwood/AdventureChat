'use strict';

import {container} from '../inversify.config';
import {UsersBusinessManager} from '../../business-managers/impl/UsersBusinessManager';
import {TYPES} from '../../types';
import User from '../../models/user';

describe('UsersBusinessManager', () => {
    const usersBusinessManager = container.get<UsersBusinessManager>(TYPES.UsersBusinessManager);

    describe("Test 'create'", () => {
        it('Should send email and create confirmation code', async () => {
            const spy = jest.spyOn(usersBusinessManager, 'sendEmail');

            const newUser: User = await usersBusinessManager.create({
                user: {
                    firstname: 'Eric',
                        lastname: 'Smallwood',
                        birthday: '1/26/1982',
                        email: 'easwsm@gmail12.com',
                        username: 'sovereign9',
                    },
                });

            expect(newUser.confirmation_code).toHaveLength(usersBusinessManager.codeLength);
            expect(spy).toBeCalled();
        });
    });
});
