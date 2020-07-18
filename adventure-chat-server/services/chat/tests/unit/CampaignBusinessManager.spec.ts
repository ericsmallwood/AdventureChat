import {container} from '../../inversify.config';
import CampaignBusinessManager from '../../business-managers/impl/CampaignBusinessManager';
import {TYPES} from '../../types';
import Campaign from '../../models/Campaign';
import Errors from '../../constants';

describe('CampaignBusinessManager', () => {
    const campaignBusinessManager = container.get<CampaignBusinessManager>(TYPES.CampaignBusinessManager);
    const getSpy = jest.spyOn(campaignBusinessManager, 'get');
    const dmCreateSpy = jest.spyOn(campaignBusinessManager._campaignDataManager, 'create');
    const verifySpy = jest.spyOn(campaignBusinessManager, 'verifyUser');

    beforeEach(() => {
        jest.clearAllMocks();
        getSpy.mockImplementation((id: number) => Promise.resolve({id}));
        dmCreateSpy.mockImplementation((campaign: Campaign) => Promise.resolve(campaign));
        verifySpy.mockImplementation((id: number, userId: number) => Promise.resolve());

    });

    describe('Test "protected Create"', () => {
        verifySpy.mockImplementation(() => Promise.resolve());
        it('Should verify user', async () => {
            const campaign = new Campaign();
            campaign.gm = 1;
            campaign.name = 'Test Campaign';
            try {
               await campaignBusinessManager.protectedCreate(campaign, 5);
               throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.NOT_AUTHORIZED);
            }
        });


        it('Should create a code', async () => {
            const spy = jest.spyOn(campaignBusinessManager, 'generateCode');

            const campaign = new Campaign();
            campaign.gm = 1;
            campaign.name = 'Test Campaign';

            const newCampaign: Campaign = await campaignBusinessManager.protectedCreate(campaign, 1);
            expect(spy).toBeCalled();
        });

        it('Should not be able to create own id', async () => {
            const campaign = new Campaign();
            campaign.gm = 1;
            campaign.name = 'Test Campaign';
            campaign.id = 53;

            const newCampaign: Campaign = await campaignBusinessManager.protectedCreate(campaign, 1);
            expect(newCampaign.id).not.toBe(53);
        });

        it('Should require a name', async () => {
            const campaign = new Campaign();
            campaign.gm = 1;

            try {
                await campaignBusinessManager.protectedCreate(campaign, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.MISSING_PARAMETERS);
            }
        });

        it('Should require a gm user id', async () => {

            const campaign = new Campaign();
            campaign.name = 'Test';

            try {
                await campaignBusinessManager.protectedCreate(campaign, 5);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBeTruthy();
            }
        });

        it('Should return the new object by calling get', async () => {
            const campaign = new Campaign();
            campaign.gm = 1;
            campaign.name = 'Test Campaign';

            await campaignBusinessManager.protectedCreate(campaign, 1);

            expect(getSpy).toBeCalledTimes(1);
        });
    });

    describe('Test "generateCode"', () => {
       it('Should generate a unique code each time its called', () => {
           const val1 =  campaignBusinessManager.generateCode();
           const val2 =  campaignBusinessManager.generateCode();
           const val3 =  campaignBusinessManager.generateCode();

           expect(val1).not.toBe(val2);
           expect(val2).not.toBe(val3);
           expect(val1).not.toBe(val3);
       });
    });

    describe('Test "protectedUpdate"', () => {
        jest
            .spyOn(campaignBusinessManager._campaignDataManager, 'update')
            .mockImplementation((id: number, data: Campaign) => Promise.resolve());

        it('Should not allow id updates', async () => {
            const campaign = new Campaign();
            campaign.name = 'Test';
            campaign.id = 1;

            try {
                await campaignBusinessManager.protectedUpdate(1, campaign, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.ILLEGAL_FIELD);
            }
        });

        it('Should not allow code updates', async () => {
            const campaign = new Campaign();
            campaign.name = 'Test';
            campaign.code = 'dsfesr';

            try {
                await campaignBusinessManager.protectedUpdate(1, campaign, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.ILLEGAL_FIELD);
            }
        });

        it('Should not allow gm updates', async () => {
            const campaign = new Campaign();
            campaign.name = 'Test';
            campaign.gm = 2;

            try {
                await campaignBusinessManager.protectedUpdate(1, campaign, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.ILLEGAL_FIELD);
            }
        });

        it('Should not allow empty name updates', async () => {
            const campaign = new Campaign();
            campaign.name = '';

            try {
                await campaignBusinessManager.protectedUpdate(1, campaign, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.cannotBeEmpty('name'));
            }

            campaign.name = null;

            try {
                await campaignBusinessManager.protectedUpdate(1, campaign, 1);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.cannotBeEmpty('name'));
            }
        });

        it('Should  call verify', async () => {
            const campaign = new Campaign();
            campaign.name = 'Test';

            await campaignBusinessManager.protectedUpdate(1, campaign, 1);
            expect(verifySpy).toBeCalledTimes(1);
        });
    });

    describe('Test "protectedDelete"', () => {
        jest
            .spyOn(campaignBusinessManager._campaignDataManager, 'delete', )
            .mockImplementation((id: number) => Promise.resolve());

        it('Should  call verify', async () => {
            const campaign = new Campaign();
            campaign.name = 'Test';

            await campaignBusinessManager.protectedDelete(1, 1);
            expect(verifySpy).toBeCalledTimes(1);
        });
    });

    describe('Test "Verify"', () => {
        it('should reject if userIds do not match', async () => {
            // Need a local one in this instance because of the way Jest mock implementations work,
            // Once defined the original functionality doesnt seem to be abel to be restored
            const localCampaignBusinessManager = container.get<CampaignBusinessManager>(TYPES.CampaignBusinessManager);
            jest
                .spyOn(localCampaignBusinessManager._campaignDataManager, 'get')
                .mockImplementation((id: number) => Promise.resolve({gm: 1}));

            try {
                await localCampaignBusinessManager.verifyUser(1, 12);
                throw new Error(Errors.SHOULD_FAIL);
            } catch (error) {
                expect(error).toBe(Errors.cannotAlter('Campaign'));
            }
        });
    });


});
