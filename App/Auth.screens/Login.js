import React, { Component } from 'react';
import {
    View, Text, ScrollView, Image, TouchableHighlight, Alert
} from 'react-native';
import { AccessToken, LoginButton } from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import styles from '../assets/css/Main'
import firebase from 'react-native-firebase'
import { withFirebase } from 'react-redux-firebase'
import { FormInput, Button } from 'react-native-elements'
import { compose, setStatic, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
export const Login = ({ auth, profile, registration }) => {

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
        <ScrollView style={styles.mainContainer}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(252,75,26)', 'rgb(247,183,51)']}>
                <View
                    style={styles.loginBar}>
                    <Image source={require('../assets/img/Logo.png')}
                        style={styles.photo}
                        resizeMode={'contain'} />
                </View>
            </LinearGradient>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 25, alignSelf: 'center' }}>Sign In</Text>
                <FormInput inputStyle={styles.inputFields} placeholder="Email" />
                <FormInput inputStyle={styles.inputFields} placeholder="Password" />
                <TouchableHighlight
                    underlayColor="white"
                    onPress={() => Alert.alert('Password reset', 'Contact support')}>
                    <Text
                        style={styles.forgotPassword}>
                        Forgot Password?
                    </Text>
                </TouchableHighlight>
                <Button
                    large
                    textStyle={{ color: 'white', fontSize: 20 }}
                    buttonStyle={styles.buttonLogin}
                    title='Sign in' />
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ backgroundColor: '#d3d3d3', height: 1, flex: 1, alignSelf: 'center' }} />
                    <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontSize: 15 }}>Or Sign in with</Text>
                    <View style={{ backgroundColor: '#d3d3d3', height: 1, flex: 1, alignSelf: 'center' }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <LoginButton
                        style={{
                            width: 145,
                            height: 31,
                            marginTop: 4
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
                    <GoogleSigninButton
                        style={{
                            width: 145,
                            height: 37,
                        }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this.signIn} />
                </View>
                <Button
                    large
                    onPress={registration}
                    buttonStyle={styles.buttonRegister}
                    textStyle={styles.buttonText}
                    title='New? Sign Up for free' />
                <Text style={{ alignContent: 'center', marginLeft: 50, marginRight: 50, fontSize: 12, marginTop: 10, marginBottom: 20 }}>By clicking 'Sign in' or 'Facebook' or 'Google' you agree to the Terms of Use and Privacy Policy</Text>
            </View>
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
    withFirebase,
    connect((state) => {
        return {
            auth: state.firebase.auth,
            profile: state.firebase.profile
        }
    }),
    withHandlers({
        registration: props => event => {
            return props.navigation.navigate('Registration');
        },
    })
)(Login)

