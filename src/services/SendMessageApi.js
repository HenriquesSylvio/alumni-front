import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = `http://127.0.0.1:8080/api/`;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: {Authorization: `Bearer ${getItem('Token')}`}
};

export function sendMessage(content, received_by) {
    console.log({content : content, received_by : {id: received_by}});
    return axios
        .post(`${URLApi}message`, {content : content, received_by : {id: received_by}}, {headers: { Authorization: `Bearer ${getItem('Token')}` }});
}