'use strict';

import { ServiceBroker, Errors } from 'moleculer';
import AccountsService from '../../accounts.service';

describe("Test 'greeter' service", () => {
	const broker = new ServiceBroker();
	broker.createService({...AccountsService});

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	let id: number;

	describe("Test 'accounts.createUser'", () => {
		it('should return a new account object', async () => {
			const res = await broker.call('accounts.createUser', {
				user: {
					firstname: 'Eric',
					lastname: 'Smallwood',
					birthday: '1/26/1982',
					email: 'easwsm@gmail3.com',
					username: 'sovereign8',
				},
			});

			expect(res).toBeTruthy();
		});
	});

	describe("Test 'accounts.getByUsername'", () => {
		it('should return account object', async () => {
			const res = await broker.call('accounts.getByUsername', {username: 'sovereign8'});

			id = res.id;

			expect(res).toBeTruthy();
		});
	});

	describe("Test 'accounts.getUser'", () => {
		it('should return account object', async () => {
			const res = await broker.call('accounts.getUser', {id});

			id = res.id;

			expect(res).toBeTruthy();
		});
	});

	describe("test 'accounts.updateUser'", () => {
		it('should return updated account object', async () => {
			const res = await broker.call('accounts.updateUser', {
				id,
				user: {
					firstname: 'Eric',
					lastname: 'Smallwood',
					birthday: '1/26/1982',
					email: 'easwsm@gmail5.com',
					username: 'sovereign8',
				},
			});

			expect(res.email).toBe('easwsm@gmail5.com');
		});
	});
	describe("Test 'accounts.deleteUser'", () => {
		it('should delete user', async () => {
			const res = await broker.call('accounts.deleteUser', {id});

			expect(res.affectedRows).toBe(1);
		});
	});

});

