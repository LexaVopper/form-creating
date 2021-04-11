import { combineReducers } from 'redux';
import toggleForms from '../Forms/redux/toggleForms';

const rootReducer = combineReducers({
  toggleForms,
});

export default rootReducer;
