import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Login from './Auth.screens/Login';
import Registration from './Auth.screens/Registration';
// import HomeScreen from './Menu.screens/HomeScreen';
// import Menu from './Menu.screens/Menu';
const AppStack = createStackNavigator({
    // HomeScreen: HomeScreen,
    // Menu: Menu
    Login: Login
});

const AuthStack = createStackNavigator({ Login: Login, Registration: Registration });

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
