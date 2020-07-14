'use strict';
import { ServiceSchema } from 'moleculer';
import {container} from './inversify.config';
import {TYPES} from './types';
import AuthBusinessManager from './business-managers/impl/AuthBusinessManager';
import authActions from './actions/authActions';


const AuthService: ServiceSchema = {
    name: 'auth',
    actions: authActions,

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

export = AuthService;
