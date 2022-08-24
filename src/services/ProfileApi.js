import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export default function getProfile(id = 'me') {
    return axios.get(`${URLApi}user/${id}`, {headers: {Authorization: `Bearer ${getItem('Token')}`}})
}