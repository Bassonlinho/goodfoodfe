
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase'
import React from "react";
import firebase from 'react-native-firebase'
export const LoadingScreen = ({ auth, navigation, profile }) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            navigation.navigate('HomeScreen');
        } else {
            navigation.navigate('Login')
        }
    });


    return null;

};

export default compose(
    withFirebase,
    connect((state) => {
        return {
            auth: state.firebase.auth,
            profile: state.firebase.profile
        }
    })
)(LoadingScreen)
