'use strict';

import {container} from '../inversify.config';
import {UsersBusinessManager} from '../../business-managers/impl/UsersBusinessManager';
import {TYPES} from '../../types';
import User from '../../models/user';
import Errors from '../../constants';

describe('UsersBusinessManager', async () => {
    const usersBusinessManager = container.get<UsersBusinessManager>(TYPES.UsersBusinessManager);

    describe("Test 'create'", () => {
        it('Should send email and create confirmation code', async () => {
            const spy = jest.spyOn(usersBusinessManager, 'sendEmail');

            const newUser: User = {
                firstname: 'Eric',
                lastname: 'Smallwood',
                birthday: new Date('1/26/1982'),
                email: 'easwsm@gmail20.com',
                username: 'sovereign',
            };

            const user: User = await usersBusinessManager.create(newUser);

            expect(user.confirmation_code).toHaveLength(usersBusinessManager.codeLength);
            expect(spy).toBeCalled();
        });

        it('Should throw error if missing required parameters', async () => {
            const newUser: User = {
                firstname: 'Eric',
                lastname: 'Smallwood',
                birthday: new Date('1/26/1982'),
                email: 'easwsm@gmail21.com',
                username: 'sovereign1',
            };

            delete newUser.firstname;
            usersBusinessManager
                .create(newUser)
                .catch(result => expect(result).toEqual(Errors.MISSING_PARAMETERS));

            newUser.firstname = 'test';
            delete newUser.lastname;

            usersBusinessManager
                .create(newUser)
                .catch(result => expect(result).toEqual(Errors.MISSING_PARAMETERS));

            newUser.lastname = 'test';
            delete newUser.email;

            usersBusinessManager
                .create(newUser)
                .catch(result => expect(result).toEqual(Errors.MISSING_PARAMETERS));

            newUser.email = 'easwsm@gmail12.com';
            delete newUser.username;

            usersBusinessManager
                .create(newUser)
                .catch(result => expect(result).toEqual(Errors.MISSING_PARAMETERS));

            newUser.username = 'sovereign9';
        });

        it('Should not be able to set id', async () => {
            const newUser: User = {
                firstname: 'Eric',
                lastname: 'Smallwood',
                birthday: new Date('1/26/1982'),
                email: 'easwsm@gmail22.com',
                username: 'sovereign2',
                id: 343,
            };

            const user: User = await usersBusinessManager.create(newUser);

            expect(user.id).not.toBe(343);
        });

        it('Should not be able to set confirmation code', async () => {
            const newUser: User = {
                firstname: 'Eric',
                lastname: 'Smallwood',
                birthday: new Date('1/26/1982'),
                email: 'easwsm@gmail23.com',
                username: 'sovereign',
                confirmation_code: 'abcdef',
            };

            const user: User = await usersBusinessManager.create(newUser);

            expect(user.confirmation_code).not.toBe('abcdef');
        });
    });

    describe("Test 'update'", () => {
        it('Should return the updated user', async () => {

            const updatedUser: User = await usersBusinessManager.update(1, {
                firstname: 'Eric',
                lastname: 'Smallwood',
                birthday: '1/26/1982',
                email: 'easwsm@gmail13.com',
                username: 'sovereign10',
            });

            expect(updatedUser).toHaveProperty('firstname');
        });

        it('cannot update confirmation_code', async () => {

            const updatedUser: User = await usersBusinessManager.update(1, {
                confirmation_code: 'abcdef',
                firstname: 'Eric',
                lastname: 'Smallwood',
                birthday: '1/26/1982',
                email: 'easwsm@gmail13.com',
                username: 'sovereign10',
            });

            expect(updatedUser.confirmation_code).not.toBe('abcdef');
        });
        it('cannot update id', async () => {

            const updatedUser: User = await usersBusinessManager.update(1, {
                id: 32,
                firstname: 'Eric',
                lastname: 'Smallwood',
                birthday: '1/26/1982',
                email: 'easwsm@gmail13.com',
                username: 'sovereign10',
            });

            expect(updatedUser.id).not.toBe(32);
        });

    });

    describe("Test 'confirmAccount'", () => {
        it('should set confirmed to true', async () => {
            jest
                .spyOn(usersBusinessManager, 'getByConfirmationCode')
                .mockImplementation((value: string) => Promise.resolve({id: 1, confirmed: 0}));
            jest
                .spyOn(usersBusinessManager, 'update')
                .mockImplementation((id: number, data: any) => Promise.resolve(data));

            const result: any = await usersBusinessManager.confirmAccount('asdfe');

            expect(result.confirmed).toBe(1);
        });
    });
});
