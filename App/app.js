import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from '../App/Routes';
import store from '../App/store'
import { GoogleSignin } from 'react-native-google-signin';
export default class App extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '726136803927-o85mm0rea6j945abh6hcedm6bfpmq27r.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
        });
    }

    render() {
        return (
            <Provider store={store()}>
                <Routes />
            </Provider>
        );
    }
}
