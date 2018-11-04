import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Login from './Auth.screens/Login';
import Registration from './Auth.screens/Registration';
import HomeScreen from './Menu.screens/HomeScreen';
import WalletScreen from './Menu.screens/WalletScreen';
import LoadingScreen from './Auth.screens/LoadingScreen';
// import Menu from './Menu.screens/Menu';
const AppStack = createStackNavigator({
    HomeScreen: HomeScreen,
    Wallet: WalletScreen,
    // Menu: Menu
    Login: Login
});

const AuthStack = createStackNavigator({ Login: Login, Registration: Registration });

export default createSwitchNavigator(
    {
        LoadingScreen: LoadingScreen,
        Wallet: WalletScreen,
        Login: Login,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Wallet',
    }
);
