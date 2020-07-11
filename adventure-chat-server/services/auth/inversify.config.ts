import { Container } from 'inversify';
import 'reflect-metadata';
import {TYPES} from './types';
import IAuthBusinessManager from './business-managers/IAuthBusinessManager';
import AuthBusinessManager from './business-managers/impl/AuthBusinessManager';
import IAuthDataManager from './data-managers/IAuthDataManager';
import AuthDataManager from './data-managers/impl/AuthDataManager';
import IAuthDao from './data-objects/IAuthDao';
import AuthMySqlDao from './data-objects/impl/AuthMySqlDao';

export const container = new Container();

container.bind<IAuthBusinessManager>(TYPES.AuthBusinessManager).to(AuthBusinessManager);
container.bind<IAuthDataManager>(TYPES.UserLoginsDataManager).to(AuthDataManager);
container.bind<IAuthDao>(TYPES.AuthDataObject).to(AuthMySqlDao);
