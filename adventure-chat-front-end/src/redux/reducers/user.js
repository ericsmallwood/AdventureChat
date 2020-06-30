import {EDIT_USER, LOAD_USER} from './../actionTypes';

const initialState = {
    user: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOAD_USER:
            return { user: action.user};
        case EDIT_USER:
            return {...state, ...action};
        default:
            return state
    }
}
