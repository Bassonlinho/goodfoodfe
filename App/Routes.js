import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Login from './Auth.screens/Login';
import Registration from './Auth.screens/Registration';
import HomeScreen from './Menu.screens/HomeScreen';
import LoadingScreen from './Auth.screens/LoadingScreen';
import Menu from './Menu.screens/Menu';
import WalletScreen from './Menu.screens/WalletScreen';
import Trace from './Menu.screens/Trace'
import ItemLocation from './components/ItemForm/ItemLocation';
import ItemForm from './components/ItemForm/ItemForm';
const AppStack = createStackNavigator({
    HomeScreen: HomeScreen,
    Trace: Trace,
    Menu: Menu,
    Login: Login,
    WalletScreen: WalletScreen,
    ItemLocation: ItemLocation,
    ItemForm: ItemForm,
});

const AuthStack = createStackNavigator({ Login: Login, Registration: Registration });

export default createSwitchNavigator(
    {
        LoadingScreen: LoadingScreen,
        Login: Login,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'LoadingScreen',
    }
);
