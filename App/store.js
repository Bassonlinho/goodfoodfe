import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../App/reducers';

// logger iskljucivati u prod jer gusi app
const createStoreWithMiddleware = applyMiddleware(thunk);
const reducer = combineReducers(reducers);
const store = createStore(reducer, createStoreWithMiddleware);

export default store;