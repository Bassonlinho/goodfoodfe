import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from '../assets/css/Main'
import { Avatar } from 'react-native-elements';
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import { compose, setStatic, withHandlers, withState } from 'recompose';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk'
import { withFirebase, isEmpty } from 'react-redux-firebase'
export const Menu = ({ auth, wallet, logOut, navigation, trace }) => {


    return (
        <View style={styles.menu}>
            <LinearGradient style={{ height: 100 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(252,75,26)', 'rgb(247,183,51)']}>
                <View style={styles.rowProfile}>
                    <Avatar
                        large
                        avatarStyle={styles.profileImage}
                        rounded
                        source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }}
                        overlayContainerStyle={{ flex: 1, marginRight: 30 }} /*Some Layout fixes*/
                        imageProps={{ resizeMode: 'cover' }}
                        activeOpacity={0.7}
                    />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.displayName}>{auth.displayName}</Text>
                        <Text style={{ fontSize: 14, color: 'white' }}>View Profile</Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.rowElement}>
                <Text style={styles.text}>Shop</Text>
            </View>
            <View style={styles.rowElement}>
                <Text style={styles.text}>My offer</Text>
            </View>
            <View style={styles.rowElement}>
                <Text style={styles.text}>My demands</Text>
            </View>
            <TouchableHighlight onPress={trace} >
                <View style={styles.rowElement}>
                    <Text style={styles.text}>Trace</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={wallet} >
                <View style={styles.rowElement}>
                    <Text style={styles.text}>Wallet</Text>
                </View>
            </TouchableHighlight>
            <View style={styles.rowElement}>
                <Text style={styles.text}>Settings</Text>
            </View>
            <TouchableHighlight onPress={logOut} >
                <View style={styles.rowElement}>
                    <Text style={styles.text}>Sign out</Text>
                </View>
            </TouchableHighlight>
        </View >
    );
}


export default compose(
    withFirebase,
    connect((state) => {
        return {
            auth: state.firebase.auth,
        }
    }),
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
        wallet: props => () => {
            return props.navigation.navigate('WalletScreen');
        },
        trace: props => () => {
            return props.navigation.navigate('Trace');
        }
    })
)(Menu)