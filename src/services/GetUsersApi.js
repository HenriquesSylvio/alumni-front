import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = "http://127.0.0.1:8080/api/"
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"
// const URLApi = `http://127.0.0.1:8080/api/post/feed?current_page=`;

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export default function getUsers(pageNumber = 1, keyword) {
    return axios.get(URLApi + `user?current_page=${pageNumber}&keyword=${keyword}`, {headers: { Authorization: `Bearer ${getItem('Token')}` }})
}