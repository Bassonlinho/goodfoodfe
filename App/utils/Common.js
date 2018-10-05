import { AsyncStorage } from 'react-native';
export const getToken = () => {
    return AsyncStorage.getItem("token").then((token) => {
        var token1 = token;
        return token1;
    }).then((token) => {
        if (token) {
            return token;
        } else {
            return null;
        }
    })
};

export const getUser = () => {
    return AsyncStorage.getItem('user').then((user) => {
        return user
    }).then((user) => {
        if (user) {
            return JSON.parse(user);
        } else {
            return null;
        }
    })
}
