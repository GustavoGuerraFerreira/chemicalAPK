import axios from "axios";
import { API_URL } from "../environment/env";

export const addMovement = company => {
    return axios
        .post(`${API_URL}/api/v1/movements/`, company)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            throw error
        });
};

export const getMovements = () => {
    return axios
        .get(`${API_URL}/api/v1/movements/`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error
        })
}