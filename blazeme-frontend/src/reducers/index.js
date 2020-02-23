import { combineReducers } from 'redux';
import { customersReducer } from './reducer.customers';

export const rootReducer = combineReducers({
  customers: customersReducer
});
