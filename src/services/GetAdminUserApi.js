import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export default function getAdminUser() {
    return axios.get(`${URLApi}user/admin`,{headers: { Authorization: `Bearer ${getItem('Token')}` }})
}