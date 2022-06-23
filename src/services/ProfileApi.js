import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLPost = `http://127.0.0.1:8080/api/user/`;

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export default function getProfile(id = 'me') {
    return axios.get(URLPost + id, config)
}