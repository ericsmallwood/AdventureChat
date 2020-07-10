import { Container } from 'inversify';
import 'reflect-metadata';
import {TYPES} from './types';
import ICampaignBusinessManager from './business-managers/ICampaignBusinessManager';
import CampaignBusinessManager from './business-managers/impl/CampaignBusinessManager';
import CampaignDataManger from './data-managers/impl/CampaignDataManger';
import ICampaignDataManager from './data-managers/ICampaignDataManager';
import {CampaignMySqlDao} from './data-objects/impl/CampaignMySqlDao';
import ICampaignDao from './data-objects/ICampaignDao';


export const container = new Container();

container.bind<ICampaignBusinessManager>(TYPES.CampaignBusinessManager).to(CampaignBusinessManager);
container.bind<ICampaignDataManager>(TYPES.CampaignDataManager).to(CampaignDataManger);
container.bind<ICampaignDao>(TYPES.CampaignDataObject).to(CampaignMySqlDao);
