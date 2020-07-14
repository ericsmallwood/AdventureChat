'use strict';
import { ServiceSchema } from 'moleculer';
import userActions from './actions/userActions';

const AccountsService: ServiceSchema = {
    name: 'accounts',
    actions: userActions(false),

    /**
     * Events
     */
    events: {

    },

    /**
     * Methods
     */
    methods: {

    },
};

export = AccountsService;
