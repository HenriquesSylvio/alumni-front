import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = `http://127.0.0.1:8080/api/`;

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};


export function deleteSubscribe(idUser) {
    return axios
        .delete(`${URLApi}user/subscribe/${idUser}`, config);
}