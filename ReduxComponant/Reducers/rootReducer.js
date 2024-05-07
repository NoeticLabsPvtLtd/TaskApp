import { combineReducers } from 'redux';
import LoginSlice from './LoginSlice';

const rootReducer = combineReducers({
  LoginInfo: LoginSlice,
});

export default rootReducer;