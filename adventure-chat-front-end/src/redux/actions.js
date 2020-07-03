import {EDIT_USER, LOAD_USER, TOGGLE_LOGGED_IN, SET_TOKEN} from './actionTypes';

// user
export const loadUser = user => ({
   type: LOAD_USER,
   payload: {user}
});

export const editUser = user => ({
   type: EDIT_USER,
   payload: {user}
});

// auth
export const    toggleLoggedIn = loggedIn => ({
    type: TOGGLE_LOGGED_IN,
    payload: {loggedIn}
});

export const setToken = token => ({
    type: SET_TOKEN,
    payload: {token}
});
