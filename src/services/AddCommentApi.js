import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {headers: { Authorization: `Bearer ${getItem('Token')}` }};

export function addComment(credentials, idPost) {
    return axios
        .post(`${URLApi}post/${idPost}/comment`, credentials, {headers: { Authorization: `Bearer ${getItem('Token')}` }});
}