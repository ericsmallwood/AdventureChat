import { TOGGLE_LOGGED_IN, SET_TOKEN } from '../actionTypes';

const initialState = {
  loggedIn: false,
  token: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LOGGED_IN:
    case SET_TOKEN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
