import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from '../assets/css/Main'
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk'
import { logout } from '../actions/GlobalActions';
import { getUser } from '../utils/Common';
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true
        }
    }

    componentDidMount() {
        getUser()
            .then((user) => {
                if (user) {
                    this.setState({
                        user: user,
                        loading: false
                    })
                } else {
                    this.setState({
                        loadingUserFailed: true,
                        loading: false
                    })
                }
            })
    }

    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.log('error', error);
        }
    };

    logOut = () => {
        LoginManager.logOut();
        this._signOut();
        this.props.logout();
        this.props.navigation.replace('Login');
    }

    render() {
        const { loading, user
        } = this.state;
        console.log('user', user);
        if (loading) {
            return <Text style={{ flex: 1, alignContent: 'center' }}>Loading..</Text>;
        }
        return (
            <View style={styles.menu} >
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
                            <Text style={styles.displayName}>{user.name + ' ' + user.surname}</Text>
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
                <TouchableHighlight onPress={this.logOut} >
                    <View style={styles.rowElement}>
                        <Text style={styles.text}>Trace</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.logOut} >
                    <View style={styles.rowElement}>
                        <Text style={styles.text}>Wallet</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.rowElement}>
                    <Text style={styles.text}>Settings</Text>
                </View>
                <TouchableHighlight onPress={this.logOut} >
                    <View style={styles.rowElement}>
                        <Text style={styles.text}>Sign out</Text>
                    </View>
                </TouchableHighlight>
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
        setInitialState: (component) => dispatch(setInitialState(component)),
        logout: () => dispatch(logout())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)