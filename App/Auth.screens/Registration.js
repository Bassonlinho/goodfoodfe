import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View, Text, ScrollView, Image, ToastAndroid
} from 'react-native';
import { AccessToken, LoginButton } from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import styles from '../assets/css/Main'
import firebase from 'react-native-firebase'
import { compose, setStatic, withHandlers, withState } from 'recompose';
import { withFirebase } from 'react-redux-firebase'
import { FormInput, Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';

export const Registration = ({ login, setEmail, setPassword, setFirstName, setLastName, registerPressed }) => {


    signIn = () => {
        GoogleSignin.signIn()
            .then((data) => {
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                return firebase.auth().signInAndRetrieveDataWithCredential(credential);
            })
            .then((user) => {
                navigation.navigate('HomeScreen')
            })
            .catch((error) => {
                ToastAndroid.show('Error while loging with Google! Please try again')
            });
    }

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
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 25, alignSelf: 'center' }}>Sign Up</Text>
                <View style={{ flexDirection: 'row' }}>
                    <FormInput inputStyle={styles.inputFieldsRow} onChangeText={setFirstName} placeholder="First Name *" />
                    <FormInput inputStyle={styles.inputFieldsRow} onChangeText={setLastName} placeholder="Last Name *" />
                </View>
                <FormInput inputStyle={styles.inputFields} onChangeText={setEmail} placeholder="Email *" />
                <FormInput inputStyle={styles.inputFields} secureTextEntry onChangeText={setPassword} placeholder="Password *" />
                <Button
                    large
                    textStyle={{ color: 'white', fontSize: 20 }}
                    buttonStyle={styles.buttonLogin}
                    onPress={registerPressed}
                    title='Sign Up' />
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ backgroundColor: '#d3d3d3', height: 1, flex: 1, alignSelf: 'center' }} />
                    <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontSize: 15 }}>Sign up quickly with</Text>
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
                                                .then(() => {
                                                    navigation.navigate('HomeScreen')
                                                })
                                                .catch((error) => {
                                                    ToastAndroid.show('Error while loging with Facebook! Please try again')
                                                });
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
                    onPress={login}
                    buttonStyle={styles.buttonRegister}
                    textStyle={styles.buttonText}
                    title='Have an account? Sign in' />
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
    withState('email', 'setEmail', ''),
    withState('password', 'setPassword', ''),
    withState('firstName', 'setFirstName', ''),
    withState('lastName', 'setLastName', ''),
    withFirebase,
    connect((state) => {
        return {
            auth: state.firebase.auth,
            profile: state.firebase.profile
        }
    }),
    withHandlers({
        registerPressed: props => () => {
            if (props.email && props.password && props.firstName && props.lastName) {
                firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(props.email, props.password)
                    .then((confirmResult) => {
                        var user = firebase.auth().currentUser;
                        user.updateProfile({
                            displayName: props.firstName + props.lastName,
                        }).then(function () {
                            props.navigation.navigate('HomeScreen')
                        }).catch(function (error) {
                            ToastAndroid.show('Error, something went wrong. Please try again!', ToastAndroid.SHORT);
                        });

                    })
                    .catch((error) => {
                        switch (error.code) {
                            case "auth/email-already-in-use":
                                ToastAndroid.show('Email already exists!', ToastAndroid.SHORT);
                                break;
                            case "auth/invalid-email":
                                ToastAndroid.show('Invalid email entered!', ToastAndroid.SHORT);
                                break;
                            case "auth/weak-password":
                                ToastAndroid.show('Password must be at least 6 characters long!', ToastAndroid.SHORT);
                                break;
                            default:
                                console.log("Error logging user in:", error);
                        }
                    })
            } else {
                ToastAndroid.show('Please enter all required fields!', ToastAndroid.SHORT);
            }
        },
        login: props => event => {
            return props.navigation.pop();
        },
    })
)(Registration)

