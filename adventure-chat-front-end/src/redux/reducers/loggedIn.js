import {TOGGLE_LOGGED_IN} from '../actionTypes';

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
      case TOGGLE_LOGGED_IN:
          return action.loggedIn;
      default:
          return state;
  }
};
