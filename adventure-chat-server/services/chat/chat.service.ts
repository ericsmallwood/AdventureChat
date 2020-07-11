'use strict';
import { ServiceSchema } from 'moleculer';
import {container} from './inversify.config';
import {TYPES} from './types';
import campaignActions from './actions/campaignActions';
import CampaignBusinessManager from './business-managers/impl/CampaignBusinessManager';
import CharacterBusinessManager from './business-managers/impl/CharacterBusinessManager';
import characterActions from './actions/characterActions';


const ChatService: ServiceSchema = {
    name: 'chat',
    actions: {
        ...campaignActions,
        ...characterActions,
    },

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

export = ChatService;
