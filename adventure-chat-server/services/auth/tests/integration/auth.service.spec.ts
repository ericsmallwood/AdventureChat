import {ServiceBroker} from 'moleculer';
import AuthService from '../../auth.service';
import Errors from '../../constants';
import AccountsService from '../../../accounts/accounts.service';


describe("Test 'greeter' service", () => {
    const broker = new ServiceBroker();
    broker.createService(AccountsService);
    broker.createService(AuthService);

    beforeAll(() => broker.start());
    afterAll(() => broker.stop());

    describe("Test 'auth.login'", () => {
       it('should call accounts service', async () => {
           const spy = jest.spyOn(broker,  'call');
           await broker.call('auth.login', {username: 'eric', password: 'nanjing1'});
           expect(spy).toBeCalled();
       });
    });
});
