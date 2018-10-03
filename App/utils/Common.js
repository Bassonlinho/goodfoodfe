import { AsyncStorage } from 'react-native';
export const getToken = () => {
    AsyncStorage.getItem("token").then((token) => {
        var token1 = token;
        return token1;
    });
};
