import React from 'react';
import {
    View, ScrollView, Image
} from 'react-native';
import styles from '../assets/css/Main'
import firebase from 'react-native-firebase'
import { withFirebase } from 'react-redux-firebase'
import { compose, setStatic, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
export const HomeScreen = ({ logOut }) => {

    return (
        <ScrollView style={styles.mainContainer}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(252,75,26)', 'rgb(247,183,51)']}>
                <View
                    style={styles.loginBar}>
                    <Image source={require('../assets/img/Logo.png')}
                        style={styles.photo}
                        resizeMode={'contain'} />
                </View>
            </LinearGradient>
            <Button
                large
                onPress={logOut}
                buttonStyle={styles.buttonRegister}
                textStyle={styles.buttonText}
                title='Logout' />
        </ScrollView >
    );
}

export default compose(
    setStatic(
        'navigationOptions',
        {
            header: null
        }
    ),
    withHandlers({
        logOut: props => () => {
            firebase.auth().signOut().then(() => {
                LoginManager.logOut();
                const isSignedIn = GoogleSignin.isSignedIn();
                if (isSignedIn) {
                    GoogleSignin.revokeAccess();
                    GoogleSignin.signOut();
                }
            })
                .then(() => {
                    return props.navigation.navigate('Login');
                })
                .catch((error) => {
                    console.log('error', error);
                });
        },
    })
)(HomeScreen)

