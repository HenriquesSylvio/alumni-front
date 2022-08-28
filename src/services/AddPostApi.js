import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export function addPost(credentials) {
    return axios
        .post(URLApi + "post", credentials, {headers: { Authorization: `Bearer ${getItem('Token')}` }});
}