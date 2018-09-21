import { combineReducers } from 'redux';

import { firebaseStateReducer } from 'react-redux-firebase'

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        firebase: firebaseStateReducer,
        ...asyncReducers
    })
};

export default makeRootReducer;