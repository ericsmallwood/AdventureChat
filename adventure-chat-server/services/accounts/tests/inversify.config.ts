import { Container } from 'inversify';
import 'reflect-metadata';
import {TYPES} from '../types';
import IEmailBusinessManager from '../business-managers/IEmailBusinessManager';
import IEmailDao from '../data-objects/IEmailDao';
import EmailDataManager from '../data-managers/impl/EmailDataManager';
import IEmailDataManager from '../data-managers/IEmailDataManager';
import EmailBusinessManager from '../business-managers/impl/EmailBusinessManager';
import IUsersDao from '../data-objects/IUsersDao';
import {UsersDataManager} from '../data-managers/impl/UsersDataManager';
import IUsersDataManager from '../data-managers/IUsersDataManager';
import {UsersBusinessManager} from '../business-managers/impl/UsersBusinessManager';
import IUsersBusinessManger from '../business-managers/IUsersBusinessManger';
import EmailMockDao from './mock-data-objects/EmailMockDao';
import UserMockDao from './mock-data-objects/UserMockDao';

export const container = new Container();

container.bind<IUsersBusinessManger>(TYPES.UsersBusinessManager).to(UsersBusinessManager);
container.bind<IUsersDataManager>(TYPES.UsersDataManager).to(UsersDataManager);
container.bind<IUsersDao>(TYPES.UsersDataObject).to(UserMockDao);

container.bind<IEmailBusinessManager>(TYPES.EmailBusinessManager).to(EmailBusinessManager);
container.bind<IEmailDataManager>(TYPES.EmailDataManager).to(EmailDataManager);
container.bind<IEmailDao>(TYPES.EmailDataObject).to(EmailMockDao);
