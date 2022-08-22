import axios from 'axios';
import { addItem } from "./LocaleStorage";

const URLApi = "http://127.0.0.1:8080/api/"
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

export function getFaculty(credentials) {
    return axios
        .get(`${URLApi}faculty`, credentials);
}