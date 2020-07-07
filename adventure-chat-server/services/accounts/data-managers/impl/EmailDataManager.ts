import {inject, injectable} from "inversify";
import IEmailDataManager from "../IEmailDataManager";
import IEmailDao from "../../data-objects/IEmailDao";
import {TYPES} from "../../types";

@injectable()
export default class EmailDataManager implements IEmailDataManager {
    private _emailDao: IEmailDao

    constructor(
        @inject(TYPES.EmailDataObject) emailDao: IEmailDao
    ) {
        this._emailDao = emailDao;
    }

    send(recipient: string, subject: string, text: string): Promise<any> {
        return this._emailDao.send(recipient, subject, text);
    }

}
