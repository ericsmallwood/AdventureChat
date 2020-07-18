import Campaign from '../../models/Campaign';
import Errors from '../../constants';
import {container} from '../../inversify.config';
import CharacterBusinessManager from '../../business-managers/impl/CharacterBusinessManager';
import {TYPES} from '../../types';
import Character from '../../models/Character';

describe('CharacterBusinessManager', () => {
    const characterBusinessManager = container.get<CharacterBusinessManager>(TYPES.CharacterBusinessManager);
    const dmCreateSpy = jest.spyOn(characterBusinessManager._characterDataManager, 'create');
    const dmUpdateSpy = jest.spyOn(characterBusinessManager._characterDataManager, 'update');
    const verifySpy = jest.spyOn(characterBusinessManager, 'verifyUser');

    beforeEach(() => {
        jest.clearAllMocks();
        dmCreateSpy.mockImplementation((data: Character) => Promise.resolve(data));
        verifySpy.mockImplementation(() => Promise.resolve());
    });

    describe('Test "protectedCreate"', () => {
        it('Should require userId', async () => {
            const character = new Character();
            character.first_name = 'Isldor';
            character.character_sheet_link = 'Test.com';

            try {
                await characterBusinessManager.protectedCreate(character, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.MISSING_PARAMETERS);
            }

        });

        it('Should have a user_id that matches the user making the request', async () => {
            const character = new Character();
            character.first_name = 'Isldor';
            character.character_sheet_link = 'Test.com';
            character.user_id = 1;

            try {
                await characterBusinessManager.protectedCreate(character, 2);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.NOT_AUTHORIZED);
            }
        });

        it('Should require first name', async () => {
            const character = new Character();
            character.character_sheet_link = 'Test.com';
            character.user_id = 1;

            try {
                await characterBusinessManager.protectedCreate(character, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.MISSING_PARAMETERS);
            }
        });

        it('Should not allow user to set character type', async () => {
            const character = new Character();
            character.first_name = 'Isldor';
            character.character_sheet_link = 'Test.com';
            character.user_id = 1;
            character.type = 5;

            const newCharacter: Character = await characterBusinessManager.protectedCreate(character, 1);
            expect(newCharacter.type).not.toBe(5);
        });
    });

    describe('Test "protectedUpdate"', () => {
        dmUpdateSpy.mockImplementation((id: number, data: Character) => Promise.resolve(data));

        it('Should not allow update of id', async () => {
            const character = new Character();
            character.first_name = 'Test';
            character.id = 1;

            try {
                await characterBusinessManager.protectedUpdate(1, character, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.ILLEGAL_FIELD);
            }
        });

        it('Should not allow empty or null first_name', async () => {
            const character = new Character();
            character.first_name = '';

            try {
                await characterBusinessManager.protectedUpdate(1, character, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.MISSING_PARAMETERS);
            }

            character.first_name = null;

            try {
                await characterBusinessManager.protectedUpdate(1, character, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.MISSING_PARAMETERS);
            }
        });

        it('Should not allow update of user_id', async () => {
            const character = new Character();
            character.first_name = 'Test';
            character.user_id = 55;

            try {
                await characterBusinessManager.protectedUpdate(1, character, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.ILLEGAL_FIELD);
            }
        });

        it('Should not allow update of type', async () => {
            const character = new Character();
            character.first_name = 'Test';
            character.type = 55;

            try {
                await characterBusinessManager.protectedUpdate(1, character, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.ILLEGAL_FIELD);
            }
        });

        it('Should call verify', async () => {
            const character = new Character();
            character.first_name = 'Test';

            await characterBusinessManager.protectedUpdate(1, character, 1);
            expect(verifySpy).toBeCalledTimes(1);

        });
    });

    describe('Test "protectedDelete"', () => {
        it('Should call verify', async () => {
            jest
                .spyOn(characterBusinessManager._characterDataManager, 'delete')
                .mockImplementation((id: number) => Promise.resolve());

            await characterBusinessManager.protectedDelete(1, 1);

            expect(verifySpy).toBeCalledTimes(1);
        });
    });

    describe('Test "Verify"', () => {
        it('should reject if userIds do not match', async () => {
            const localCharacterBusinessManager = container
                .get<CharacterBusinessManager>(TYPES.CharacterBusinessManager);

            jest
                .spyOn(localCharacterBusinessManager._characterDataManager, 'get')
                .mockImplementation((id: number) => Promise.resolve({user_id: 1}));

            try {
                await localCharacterBusinessManager.verifyUser(1, 12);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.cannotAlter('Character'));
            }
        });
    });
});
