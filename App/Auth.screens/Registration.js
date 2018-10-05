import React from 'react';
import { connect } from 'react-redux';
import {
    View, Text, ScrollView, Image, ToastAndroid
} from 'react-native';
import styles from '../assets/css/Main'
import { FormInput, Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { createAccount } from '../actions/GlobalActions';
class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''

        }
    }
    static navigationOptions = {
        header: null
    };


    componentDidMount() {
        let fb_profile = this.props.navigation.getParam('fb_profile');
        let gmail_profile = this.props.navigation.getParam('gmail_profile');
        if (fb_profile && fb_profile.id) {
            this.setState({
                firstName: fb_profile.first_name,
                lastName: fb_profile.last_name,
                email: fb_profile.email,
            })
        }
        if (gmail_profile && gmail_profile.id) {
            let name = gmail_profile.name.split(" ");
            let firstName = name[0];
            let lastName = name[1];
            this.setState({
                firstName: firstName,
                lastName: lastName,
                email: gmail_profile.email,
            })
        }
    }

    isEditable() {
        let option;
        let fb_profile = this.props.navigation.getParam('fb_profile');
        let gmail_profile = this.props.navigation.getParam('gmail_profile');
        if ((gmail_profile && gmail_profile.id) || (fb_profile && fb_profile.id)) {
            option = false;
        } else {
            option = true;
        }
        return option;
    }

    loginPressed = () => {
        this.props.navigation.pop();
    }

    registerPressed = () => {
        let fb_profile = this.props.navigation.getParam('fb_profile');
        let gmail_profile = this.props.navigation.getParam('gmail_profile');
        if (this.state.email &&
            this.state.password &&
            this.state.firstName &&
            this.state.lastName) {
            this.props.createAccount(
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName,
                fb_profile,
                gmail_profile
            )
        }
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
                    <Text style={{ fontSize: 25, alignSelf: 'center' }}>Sign Up</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <FormInput inputStyle={styles.inputFieldsRow} defaultValue={this.state.firstName} editable={this.isEditable()} onChangeText={(firstName) => this.setState({ firstName: firstName })} placeholder="First Name *" />
                        <FormInput inputStyle={styles.inputFieldsRow} defaultValue={this.state.lastName} editable={this.isEditable()} onChangeText={(lastName) => this.setState({ lastName: lastName })} placeholder="Last Name *" />
                    </View>
                    <FormInput inputStyle={styles.inputFields} defaultValue={this.state.email} editable={this.isEditable()} onChangeText={(email) => this.setState({ email: email })} placeholder="Email *" />
                    <FormInput inputStyle={styles.inputFields} secureTextEntry onChangeText={(password) => this.setState({ password: password })} placeholder="Password *" />
                    <Button
                        large
                        textStyle={{ color: 'white', fontSize: 20 }}
                        buttonStyle={styles.buttonLogin}
                        onPress={this.registerPressed}
                        title='Sign Up' />
                    <Button
                        large
                        onPress={this.loginPressed}
                        buttonStyle={styles.buttonRegister}
                        textStyle={styles.buttonText}
                        title='Have an account? Sign in' />
                    <Text style={{ alignContent: 'center', marginLeft: 50, marginRight: 50, fontSize: 12, marginTop: 10, marginBottom: 20 }}>By clicking 'Sign Up' or 'Facebook' or 'Google' you agree to the Terms of Use and Privacy Policy</Text>
                </View>
            </ScrollView >
        );
    }
}
function mapStateToProps(state) {
    return {
        errorMessage: state.globalReducer.errorMessage,
        registerFailed: state.globalReducer.registerFailed,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setInitialState: (component) => dispatch(setInitialState(component)),
        createAccount: (email, password, firstName, lastName, fb_profile, gmail_profile) => dispatch(createAccount(email, password, firstName, lastName, fb_profile, gmail_profile))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration)

