import { Container } from "inversify";
import "reflect-metadata";
import {TYPES} from './types';


export const container = new Container();

// container.bind<IAuthBusinessManager>(TYPES.AuthBusinessManager).to(AuthBusinessManager);
// container.bind<IAuthDataManager>(TYPES.UserLoginsDataManager).to(AuthDataManager);
// container.bind<IAuthDao>(TYPES.AuthDataObject).to(AuthMySqlDao);
