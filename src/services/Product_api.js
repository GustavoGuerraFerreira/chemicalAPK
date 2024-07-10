
import axios from "axios";
import { API_URL } from "../environment/env";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getProduct = async id => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/products/${id}/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
