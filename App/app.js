import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../App/reducers';
import Routes from '../App/Routes';

const createStoreWithMiddleware = applyMiddleware(thunk);
const reducer = combineReducers(reducers);
const store = createStore(reducer, createStoreWithMiddleware);

export default class App extends Component {
    constructor() {
        super();
    }

    // componentDidMount() {
    //     //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
    //     SplashScreen.close({
    //         animationType: SplashScreen.animationType.scale,
    //         duration: 850,
    //         delay: 0,
    //     })
    // }

    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}
