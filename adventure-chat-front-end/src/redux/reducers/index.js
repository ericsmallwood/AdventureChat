import {combineReducers} from "redux";
import user from './user';
import loggedIn from './loggedIn';

export default combineReducers({user, loggedIn});
