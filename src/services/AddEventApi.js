import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = `http://127.0.0.1:8080/api/`;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: {Authorization: `Bearer ${getItem('Token')}`}
};

export function addEvent(credentials) {
    const current = new Date();
    return axios
        // .post(`${URLApi}event`, `{"title": "${title}", "description": "${description}"}`, config);
        .post(`${URLApi}event`, credentials, config);
        }
// {subscriber: {id: idUser}}
// , "date": "31/07/2022"