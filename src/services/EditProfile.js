import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"
const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};


export function EditProfile(credentials) {
    return axios
        .put(`${URLApi}user/edit`, credentials, {headers: { Authorization: `Bearer ${getItem('Token')}` }});
}