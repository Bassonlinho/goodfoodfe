import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View
} from 'react-native';
import { AccessToken, LoginButton } from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import styles from '../assets/css/Main'
import firebase from 'react-native-firebase'
import { compose } from 'redux'
import { withFirebase } from 'react-redux-firebase'

export const Login = ({ auth, profile, navigation }) => {

    //uraditi drugacije 
    signIn = () => {
        GoogleSignin.signIn()
            .then((data) => {
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                return firebase.auth().signInAndRetrieveDataWithCredential(credential);
            })
            .then((user) => {

            })
            .catch((error) => {
                const { code, message } = error;
            });
    }

    return (
        <View style={{
            backgroundColor: '#FFF',
            alignItems: 'center',
            flex: 1
        }}>
            <GoogleSigninButton
                style={{
                    borderRadius: 5,
                    width: 287,
                    height: 48,
                }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn} />
            <LoginButton
                style={{
                    borderRadius: 5,
                    width: 280,
                    height: 35,
                    marginLeft: 5
                }}
                readPermissions={["email", "public_profile"]}
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            console.log('fb error1', JSON.stringify(error))
                        } else if (result.isCancelled) {
                            console.log("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    let accessToken = data.accessToken;
                                    const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
                                    firebase.auth().signInAndRetrieveDataWithCredential(credential)
                                })
                        }
                    }
                }
                onLogoutFinished={() => console.log("logout.")} />

        </View>
    );
}

export default compose(
    withFirebase,
    connect((state) => {
        return {
            auth: state.firebase.auth,
            profile: state.firebase.profile
        }
    })
)(Login)

