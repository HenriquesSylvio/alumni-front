import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = `http://127.0.0.1:8080/api/`;

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};


export function EditProfile(credentials) {
    return axios
        .put(`${URLApi}user/edit`, credentials, config);
}