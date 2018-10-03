import axios from 'axios';
import { config } from '../config/config';

const serverUrl = config.serverUrl;
export const Type = {
    LOGIN_CALL: 'LOGIN_CALL',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',

    FB_LOGIN_CALL: 'FB_LOGIN_CALL',
    FB_LOGIN_SUCCESS: 'FB_LOGIN_SUCCESS',
    FB_LOGIN_FAILED: 'FB_LOGIN_FAILED',

    GMAIL_LOGIN_CALL: 'GMAIL_LOGIN_CALL',
    GMAIL_LOGIN_SUCCESS: 'GMAIL_LOGIN_SUCCESS',
    GMAIL_LOGIN_FAILED: 'GMAIL_LOGIN_FAILED',

    LOGOUT: 'LOGOUT',

    REGISTER_CALL: 'REGISTER_CALL',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILED: 'REGISTER_FAILED',

    SET_INITIAL_STATE: 'SET_INITIAL_STATE',
};

export function setInitialState(component) {
    return (dispatch) => {
        dispatch({
            type: Type.SET_INITIAL_STATE,
            data: component
        });
    }
}

export function logout() {
    return (dispatch) => {
        dispatch({
            type: Type.LOGOUT
        });
    }
}

export function loginWithUsername(username, password) {
    return (dispatch) => {

        dispatch({
            type: Type.LOGIN_CALL
        });

        axios.post(serverUrl + '/login', {
            username: username,
            password: password
        })
            .then(function (response) {

                dispatch({
                    type: Type.LOGIN_SUCCESS,
                    data: response.data
                });
            })
            .catch(function (error) {
                console.log('error', error);
                dispatch({
                    type: Type.LOGIN_FAILED
                });
            });
    }
}

export function facebookLogin(user) {
    return (dispatch) => {

        dispatch({
            type: Type.FB_LOGIN_CALL
        });

        axios.post(serverUrl + '/login/socials', {
            fb_profile: user
        })
            .then(function (response) {
                console.log('resp', response);
                dispatch({
                    type: Type.FB_LOGIN_SUCCESS,
                    data: response.data
                });
            })
            .catch(function (error) {
                console.log('error', error);
                dispatch({
                    type: Type.FB_LOGIN_FAILED,
                    data: error
                });
            });
    }
}

export function googleLogin(user) {
    return (dispatch) => {

        dispatch({
            type: Type.GMAIL_LOGIN_CALL
        });

        axios.post(serverUrl + '/login/socials', {
            gmail_profile: user
        })
            .then(function (response) {
                dispatch({
                    type: Type.GMAIL_LOGIN_SUCCESS,
                    data: response.data
                });
            })
            .catch(function (error) {
                dispatch({
                    type: Type.GMAIL_LOGIN_FAILED
                });
            });
    }
}

export function createAccount(email, password, firstName, lastName, profile, gmail_profile) {
    return (dispatch) => {

        dispatch({
            type: Type.REGISTER_CALL
        });

        axios.post(serverUrl + '/register', {
            username: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            fb_profile: profile,
            gmail_profile: gmail_profile
        })
            .then(function (response) {
                dispatch({
                    type: Type.REGISTER_SUCCESS,
                    data: response.data
                });
            })
            .catch(function (error) {
                dispatch({
                    type: Type.REGISTER_FAILED,
                    data: error
                });
            });
    }
}