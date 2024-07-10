import axios from "axios";
import { setAxiosAuthToken } from "./tokenHandles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../environment/env";

export const logar = (userData) => {
  console.log(userData);
  return axios
    .post(`${API_URL}/api/v1/token/login/`, userData, {
      headers: {
        'Authorization': ``
      }
    })
    .then(response => {
      console.log(response.data);
      const { auth_token } = response.data;
      setAxiosAuthToken(auth_token);
      setToken(auth_token);
      getCurrentUser();
    })
    .catch(error => {
      console.log(error.message);
      throw error;
    });
};

export const getCurrentUser = (redirectTo) => {
  return axios
    .get(`${API_URL}/api/v1/users/me/`)
    .then(response => {
      console.log(response.data)
      const user = response.data;
      return user;
    })
    .catch(error => {
      throw error;
    });
};

export const setCurrentUser = async (user, redirectTo) => { 
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user)); 
  } catch (error) {
    console.error("Erro ao definir o usuário:", error);
    throw error;
  }
};

export const unsetCurrentUser = async () => {
  setAxiosAuthToken("");
  try {
    await AsyncStorage.removeItem("token"); 
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.error("Erro ao remover o usuário:", error);
    throw error;
  }
};

export const setToken = async (token) => {
  setAxiosAuthToken(token);
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Erro ao definir o token:", error);
    throw error;
  }
};

