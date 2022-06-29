import axios from 'axios';
import { addItem } from "./LocaleStorage";

const URLApi = "http://127.0.0.1:8080/api/"

export function register(credentials) {
    return axios
        .post(`${URLApi}register`, credentials);
}