import axios from 'axios';
import { addItem } from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

export function getFaculty(credentials) {
    return axios
        .get(`${URLApi}faculty`, credentials);
}