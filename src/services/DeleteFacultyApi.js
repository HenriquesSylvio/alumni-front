import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};


export function deleteFaculty(idFaculty) {
    return axios
        .delete(`${URLApi}faculty/${idFaculty}`, {headers: { Authorization: `Bearer ${getItem('Token')}` }});
}