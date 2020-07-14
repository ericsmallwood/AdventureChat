import {injectable} from 'inversify';
import IEmailDao from '../../data-objects/IEmailDao';

@injectable()
export default class EmailMockDao implements IEmailDao {
    public send(recipient: string, subject: string, text: string): Promise<any> {
        return Promise.resolve('Sent');
    }
}
