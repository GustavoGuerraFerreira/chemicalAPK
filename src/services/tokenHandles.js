import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAxiosAuthToken = token => {
  console.log("setaxios ")
  if (typeof token !== "undefined" && token) {
    console.log(token)
    axios.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// axios.interceptors.request.use(
//   async config => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Token ${token}`;
//       }
//     } catch (error) {
//       console.error('Error getting token from AsyncStorage:', error);
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );