import { Container } from 'inversify';
import 'reflect-metadata';
import {TYPES} from './types';
import ICampaignBusinessManager from './business-managers/ICampaignBusinessManager';
import CampaignBusinessManager from './business-managers/impl/CampaignBusinessManager';
import CampaignDataManger from './data-managers/impl/CampaignDataManger';
import ICampaignDataManager from './data-managers/ICampaignDataManager';
import {CampaignMySqlDao} from './data-objects/impl/CampaignMySqlDao';
import ICampaignDao from './data-objects/ICampaignDao';
import ICharacterBusinessManager from './business-managers/ICharacterBusinessManager';
import CharacterBusinessManager from './business-managers/impl/CharacterBusinessManager';
import ICharacterDataManager from './data-managers/ICharacterDataManager';
import CharacterDataManager from './data-managers/impl/CharacterDataManager';
import CharacterMySqlDao from './data-objects/impl/CharacterMySqlDao';
import ICharacterDao from './data-objects/ICharacterDao';


export const container = new Container();

container.bind<ICampaignBusinessManager>(TYPES.CampaignBusinessManager).to(CampaignBusinessManager);
container.bind<ICampaignDataManager>(TYPES.CampaignDataManager).to(CampaignDataManger);
container.bind<ICampaignDao>(TYPES.CampaignDataObject).to(CampaignMySqlDao);
container.bind<ICharacterBusinessManager>(TYPES.CharacterBusinessManager).to(CharacterBusinessManager);
container.bind<ICharacterDataManager>(TYPES.CharacterDataManager).to(CharacterDataManager);
container.bind<ICharacterDao>(TYPES.CharacterDataObject).to(CharacterMySqlDao);
