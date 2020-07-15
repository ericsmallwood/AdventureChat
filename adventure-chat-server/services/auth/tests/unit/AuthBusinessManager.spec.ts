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
        it('should get hash of password', async () => {
            const spy = jest.spyOn(authBusinessManager.crypto, 'createHash');
            await authBusinessManager.login(1, 'test');

            expect(spy).toBeCalled();
        });

        it('should update token', async () => {
            const spy = jest.spyOn(authBusinessManager, 'updateToken');
            await authBusinessManager.login(1, 'test');

            expect(spy).toBeCalled();
        });

        it('should throw error if missing parameters', async () => {
            authBusinessManager.login(null, 'abcde')
                .then(() => {
                    throw new Error(Errors.SHOULD_FAIL);
                })
                .catch(error => expect(error).toBeTruthy());

            authBusinessManager.login(1, null)
                .then(() => {
                    throw new Error(Errors.SHOULD_FAIL);
                })
                .catch(error => expect(error).toBeTruthy());

            authBusinessManager.login(1, 'abcde')
                .then(result => {
                    expect(result).toBeTruthy();
                })
                .catch(error => {
                    throw new Error(Errors.SHOULD_SUCCEED);
                });
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
