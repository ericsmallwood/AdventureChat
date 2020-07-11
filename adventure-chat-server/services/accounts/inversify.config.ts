import { Container } from 'inversify';
import 'reflect-metadata';
import {TYPES} from './types';
import IUsersBusinessManger from './business-managers/IUsersBusinessManger';
import {UsersBusinessManager} from './business-managers/impl/UsersBusinessManager';
import IUsersDataManager from './data-managers/IUsersDataManager';
import {UsersDataManager} from './data-managers/impl/UsersDataManager';
import IUsersDao from './data-objects/IUsersDao';
import {UsersMySqlDao} from './data-objects/impl/UsersMySqlDao';
import IEmailBusinessManager from './business-managers/IEmailBusinessManager';
import EmailBusinessManager from './business-managers/impl/EmailBusinessManager';
import IEmailDataManager from './data-managers/IEmailDataManager';
import EmailDataManager from './data-managers/impl/EmailDataManager';
import IEmailDao from './data-objects/IEmailDao';
import EmailNodeMailerDao from './data-objects/impl/EmailNodeMailerDao';

export const container = new Container();

container.bind<IUsersBusinessManger>(TYPES.UsersBusinessManager).to(UsersBusinessManager);
container.bind<IUsersDataManager>(TYPES.UsersDataManager).to(UsersDataManager);
container.bind<IUsersDao>(TYPES.UsersDataObject).to(UsersMySqlDao);

container.bind<IEmailBusinessManager>(TYPES.EmailBusinessManager).to(EmailBusinessManager);
container.bind<IEmailDataManager>(TYPES.EmailDataManager).to(EmailDataManager);
container.bind<IEmailDao>(TYPES.EmailDataObject).to(EmailNodeMailerDao);
