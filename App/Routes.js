import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Login from './Auth.screens/Login';
import Registration from './Auth.screens/Registration';

const AppStack = createStackNavigator({
    Registration: Registration 
});

const AuthStack = createStackNavigator({ Login: Login});

export default createSwitchNavigator(
    {
        Login: Login,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Login',
    }
);
