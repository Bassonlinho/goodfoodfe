import React from 'react';
import {
    View, Text, ScrollView, Image, TouchableHighlight, Alert, ToastAndroid
} from 'react-native';
import { loginWithUsername, facebookLogin, setInitialState, googleLogin } from '../actions/GlobalActions';
import { AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import styles from '../assets/css/Main'
import { FormInput, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
class Login extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            gmail_profile: {},
            fb_profile: {},
        };

    }

    componentDidUpdate(prevProps) {
        if (prevProps.token === null && this.props.token) {
            this.props.navigation.navigate('HomeScreen');
        }
        if (prevProps.logInFailed === false && this.props.logInFailed === true) {
            ToastAndroid.show(("Username or password are incorrect!"), ToastAndroid.SHORT);
            this.props.setInitialState('logInFailed');
        }
        if (prevProps.facebookLogingFailed === false && this.props.facebookLogingFailed === true) {
            this.props.setInitialState('facebookLogingFailed');
            this.props.navigation.navigate('Registration', {
                fb_profile: this.state.fb_profile,
                gmail_profile: {}
            });
        }
        if (prevProps.gmailLogingFailed === false && this.props.gmailLogingFailed === true) {
            this.props.setInitialState('gmailLogingFailed');
            this.props.navigation.navigate('Registration', {
                gmail_profile: this.state.gmail_profile,
                fb_profile: {}
            });
        }
    }

    signInWithGoogle = () => {
        GoogleSignin.signIn()
            .then((data) => {
                this.setState({ gmail_profile: data.user })
                this.props.googleLogin(data.user);
            })
            .catch((error) => {
                ToastAndroid.show('Error while loging with Google! Please try again')
            });
    }

    loginPressed = () => {
        if (this.state.username && this.state.password) {
            this.props.loginWithUsername(this.state.username, this.state.password)
        } else {
            ToastAndroid.show(("Email and password are required"), ToastAndroid.SHORT);
        }
    }

    registerPressed = () => {
        this.props.navigation.navigate('Registration');
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer} >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(252,75,26)', 'rgb(247,183,51)']}>
                    <View
                        style={styles.loginBar}>
                        <Image source={require('../assets/img/Logo.png')}
                            style={styles.photo}
                            resizeMode={'contain'} />
                    </View>
                </LinearGradient>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, alignSelf: 'center' }}>Sign In</Text>
                    <FormInput inputStyle={styles.inputFields} onChangeText={(username) => this.setState({ username: username })} placeholder="Email *" />
                    <FormInput secureTextEntry inputStyle={styles.inputFields} onChangeText={(password) => this.setState({ password: password })} placeholder="Password *" />
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
                        onPress={this.loginPressed}
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
                                                const responseInfoCallback = (error, result) => {
                                                    if (error) {
                                                        ToastAndroid.show(("Internal server error, try again later!"), ToastAndroid.SHORT);
                                                    } else {
                                                        this.setState({
                                                            fb_profile: result,
                                                        })
                                                        this.props.facebookLogin(result);
                                                    }
                                                }

                                                const infoRequest = new GraphRequest(
                                                    '/me',
                                                    {
                                                        accessToken: accessToken,
                                                        parameters: {
                                                            fields: {
                                                                string: 'email,first_name,middle_name,last_name'
                                                            }
                                                        }
                                                    },
                                                    responseInfoCallback
                                                );

                                                // Start the graph request.
                                                new GraphRequestManager().addRequest(infoRequest).start();

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
                            onPress={this.signInWithGoogle} />
                    </View>
                    <Button
                        large
                        onPress={this.registerPressed}
                        buttonStyle={styles.buttonRegister}
                        textStyle={styles.buttonText}
                        title='New? Sign Up for free' />
                    <Text style={{ alignContent: 'center', marginLeft: 50, marginRight: 50, fontSize: 12, marginTop: 10, marginBottom: 20 }}>By clicking 'Sign in' or 'Facebook' or 'Google' you agree to the Terms of Use and Privacy Policy</Text>
                </View>
            </ScrollView >
        );
    }
}
function mapStateToProps(state) {
    return {
        logInFailed: state.globalReducer.logInFailed,
        facebookLoging: state.globalReducer.facebookLoging,
        facebookLogedIn: state.globalReducer.facebookLogedIn,
        facebookLogingFailed: state.globalReducer.facebookLogingFailed,
        gmailLoging: state.globalReducer.gmailLoging,
        gmailLogedIn: state.globalReducer.gmailLogedIn,
        gmailLogingFailed: state.globalReducer.gmailLogingFailed,
        token: state.globalReducer.token,
        user: state.globalReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setInitialState: (component) => dispatch(setInitialState(component)),
        facebookLogin: (user) => dispatch(facebookLogin(user)),
        googleLogin: (gmail_profile) => dispatch(googleLogin(gmail_profile)),
        loginWithUsername: (username, password) => dispatch(loginWithUsername(username, password)),

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

