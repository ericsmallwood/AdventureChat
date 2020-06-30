import {EDIT_USER, LOAD_USER, TOGGLE_LOGGED_IN} from './actionTypes';

export const changeUser = user => ({
   type: LOAD_USER,
   payload: {user}
});

export const editUser = user => ({
   type: EDIT_USER,
   payload: {user}
});

export const toggleLoggedIn = loggedIn => ({
    type: TOGGLE_LOGGED_IN,
    payload: {loggedIn}
});
