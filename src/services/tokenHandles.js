import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAxiosAuthToken = token => {
  if (typeof token !== "undefined" && token) {
    console.log(token)
    axios.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Configurar o interceptor global para adicionar o token de autorização a todas as solicitações
axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);