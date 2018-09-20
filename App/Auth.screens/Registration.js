import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Alert, StyleSheet, Text, View, TextInput,
    BackHandler, TouchableHighlight, ToastAndroid
} from 'react-native';
import { AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userInfo: {}
        }
    }

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '726136803927-o85mm0rea6j945abh6hcedm6bfpmq27r.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
        });
    }
    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
            this.props.googleLogin(userInfo);
        } catch (error) {
            console.log('error', error);
        }
    };

    render() {
        return (
            <View>
                <View style={{ marginTop: 10 }}>
                    <GoogleSigninButton
                        style={{
                            borderRadius: 5,
                            width: 290,
                            height: 48,
                        }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this.signIn} />
                    {this.state.facebookLoging || !this.props.facebookLogedIn &&
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
                                        ToastAndroid.show(I18n.t("internal_server_error"), ToastAndroid.SHORT);
                                    } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                    } else {
                                        AccessToken.getCurrentAccessToken().then(
                                            (data) => {
                                                let accessToken = data.accessToken;

                                                const responseInfoCallback = (error, result) => {
                                                    if (error) {
                                                        console.log('fb error2', JSON.stringify(error))
                                                    } else {
                                                        this.setState({
                                                            fb_profile: result,
                                                        })
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
                    }
                </View>
            </View >
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);

