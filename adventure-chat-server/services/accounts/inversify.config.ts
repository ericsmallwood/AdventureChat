import { Container } from "inversify";
import "reflect-metadata";
import {TYPES} from './types';
import IUsersBusinessManger from "./business-managers/IUsersBusinessManger";
import {UsersBusinessManager} from "./business-managers/impl/UsersBusinessManager";
import IUsersDataManager from "./data-managers/IUsersDataManager";
import {UsersDataManager} from "./data-managers/impl/UsersDataManager";
import IUsersDao from "./data-objects/IUsersDao";
import {UsersMySqlDao} from "./data-objects/impl/UsersMySqlDao";

export const container = new Container();

container.bind<IUsersBusinessManger>(TYPES.UsersBusinessManager).to(UsersBusinessManager);
container.bind<IUsersDataManager>(TYPES.UsersDataManager).to(UsersDataManager);
container.bind<IUsersDao>(TYPES.UsersDataObject).to(UsersMySqlDao);
