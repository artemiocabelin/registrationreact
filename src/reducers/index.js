import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import MessageReducer from './reducer_message';

const rootReducer = combineReducers({
  form: formReducer,
  message: MessageReducer
});

export default rootReducer;
