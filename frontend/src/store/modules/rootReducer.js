import { combineReducers } from 'redux';

import auth from './auth/reducer';
import modal from './modal/reducer';
import menu from './menu/reducer';

export default combineReducers({ auth, modal, menu });
