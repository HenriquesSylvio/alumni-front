import axios from 'axios';
import {getItem} from "./LocaleStorage";

// const URLApi = "http://127.0.0.1:8080/api/"
const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export default function getProfile(id = 'me') {
    return axios.get(`${URLApi}user/${id}`, config)
}