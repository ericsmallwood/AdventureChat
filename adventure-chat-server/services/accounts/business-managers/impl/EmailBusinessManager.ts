import {inject, injectable} from 'inversify';
import IEmailBusinessManager from '../IEmailBusinessManager';
import IEmailDataManager from '../../data-managers/IEmailDataManager';
import {TYPES} from '../../types';

@injectable()
export default class EmailBusinessManager implements IEmailBusinessManager {
    private _emailDataManager: IEmailDataManager;

    public constructor(
        @inject(TYPES.EmailDataManager) emailDataManager: IEmailDataManager
    ) {
         this._emailDataManager = emailDataManager;
    }

    public send(recipient: string, subject: string, text: string): Promise<any> {
        return this._emailDataManager.send(recipient, subject, text);
    }
}
