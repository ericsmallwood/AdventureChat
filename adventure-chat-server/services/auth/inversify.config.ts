import { Container } from "inversify";
import "reflect-metadata";
import {TYPES} from './types';
import IUserLoginsBusinessManager from "./business-managers/IUserLoginsBusinessManager";
import UserLoginsBusinessManager from "./business-managers/impl/UserLoginsBusinessManager";
import IUserLoginsDataManager from "./data-managers/IUserLoginsDataManager";
import UserLoginsDataManager from "./data-managers/impl/UserLoginsDataManager";
import IUserLoginsDao from "./data-objects/IUserLoginsDao";
import UserLoginsMySqlDao from "./data-objects/impl/UserLoginsMySqlDao";

export const container = new Container();

container.bind<IUserLoginsBusinessManager>(TYPES.UserLoginsBusinessManager).to(UserLoginsBusinessManager);
container.bind<IUserLoginsDataManager>(TYPES.UserLoginsDataManager).to(UserLoginsDataManager);
container.bind<IUserLoginsDao>(TYPES.UserLoginsDataObject).to(UserLoginsMySqlDao);
