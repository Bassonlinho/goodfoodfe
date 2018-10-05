import axios from 'axios';
import { AsyncStorage } from 'react-native';

axios.interceptors.request.use(
    (config) => {
        //config.headers['Access-Control-Allow-Origin'] = '*';
        return AsyncStorage.getItem("token").then((token) => {
            // console.log('getMarketPlace token:  ' + token);
            config.headers['Authorization'] = 'Bearer ' + token;
            return config;

        })
        
    },
    (error) => Promise.reject(error)
);

// axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status == 401) {
//             localStorage.clear();
//             location.replace(location.origin);
//         }
//         return Promise.reject(error)
//     }
// );

export default axios;
