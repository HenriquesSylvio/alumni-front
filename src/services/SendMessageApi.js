import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: {Authorization: `Bearer ${getItem('Token')}`}
};

export function sendMessage(content, received_by) {
    console.log({content : content, received_by : {id: received_by}});
    return axios
        .post(`${URLApi}message`, {content : content, received_by : {id: received_by}}, {headers: { Authorization: `Bearer ${getItem('Token')}` }});
}