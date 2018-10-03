
import { connect } from 'react-redux'
import React from "react";
import { getToken } from '../utils/Common';
export const LoadingScreen = ({ navigation }) => {
    const token = getToken();
    console.log('token', token);
    if (token) {
        navigation.navigate('HomeScreen');
    } else {
        navigation.navigate('Login')
    }

    return null;
};

export default connect(

)(LoadingScreen)
