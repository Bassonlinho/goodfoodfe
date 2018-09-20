/** @format */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App/app';

class GoodFood extends Component {
    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent(appName, () => GoodFood);

