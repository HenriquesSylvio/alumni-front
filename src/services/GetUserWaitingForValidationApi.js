import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export default function getUserWaitingForValidation() {
    return axios.get(URLApi + `user/waitingValidation`, {headers: { Authorization: `Bearer ${getItem('Token')}` }})
}