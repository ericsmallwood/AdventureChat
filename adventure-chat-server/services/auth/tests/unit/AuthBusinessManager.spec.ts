import AuthBusinessManager from '../../business-managers/impl/AuthBusinessManager';
import {TYPES} from '../../types';
import {container} from '../../inversify.config';
import Errors from '../../constants';

describe('AuthBusinessManager', () => {
    const authBusinessManager = container.get<AuthBusinessManager>(TYPES.AuthBusinessManager);

    jest
        .spyOn(authBusinessManager._authDataManager, 'login')
        .mockImplementation((userId: number, hash: string) => Promise.resolve({
            userid: userId,
            token: 'abcd',
            hash: 'abc123',
        }));

    jest
        .spyOn(authBusinessManager._authDataManager, 'updateToken')
        .mockImplementation((userId: number) => Promise.resolve());

    jest
        .spyOn(authBusinessManager._authDataManager, 'createUserLogin')
        .mockImplementation((userLogin: any) => Promise.resolve());

    describe("test 'login'", () => {
        const user: any = {
            id: 1,
            firstname: 'Eric',
            lastname: 'S',
            confirmed: true,
        };

        it('Should fail if the user is not confirmed', async () => {
            user.confirmed = false;
            try {
                await authBusinessManager.login(user, 'test');
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.NOT_CONFIRMED);
            }
        });

        it('should get hash of password', async () => {
            user.confirmed = true;
            const spy = jest.spyOn(authBusinessManager.crypto, 'createHash');
            await authBusinessManager.login(user, 'test');

            expect(spy).toBeCalled();
        });

        it('should update token', async () => {
            user.confirmed = true;
            const spy = jest.spyOn(authBusinessManager, 'updateToken');
            await authBusinessManager.login(user, 'test');

            expect(spy).toBeCalled();
        });

        it('should throw error if missing parameters', async () => {
            user.confirmed = true;
            try {
                await authBusinessManager.login(null, 'abcde');
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBeTruthy();
            }

            try {
                await authBusinessManager.login(user, null);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBeTruthy();
            }

            try {
                const result = await authBusinessManager.login(user, 'abcde');
                expect(result).toBeTruthy();
            } catch (error) {
                throw new Error(Errors.SHOULD_SUCCEED);
            }
        });
    });

    describe("test 'updateToken'", () => {
        it('Should update user token', async () => {
            const result = await authBusinessManager.updateToken(1);

            expect(result.token).toBeTruthy();
            expect(result.token.length).toBeGreaterThan(0);
        });
    });

    describe("test 'createUserLogin'", () => {
        it('Should save a hash of the password not the password', async () => {
            const spy = jest.spyOn(authBusinessManager.crypto, 'createHash');
            await authBusinessManager.createUserLogin(1, 'test');

            expect(spy).toBeCalled();
        });

        it('Should create and return a token', async () => {
            const result = await authBusinessManager.createUserLogin(1, 'test');

            expect(result.token).toBeTruthy();
            expect(result.token.length).toBeGreaterThan(0);
        });
    });
});
