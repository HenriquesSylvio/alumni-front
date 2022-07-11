import axios from 'axios';
import {getItem} from "./LocaleStorage";

// const pageNumber = 1;
// const URLPost = `http://127.0.0.1:8080/api/post/feed?current_page=`;
const URLApi = `http://127.0.0.1:8080/api/post/feed?current_page=`;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/post/feed?current_page="
const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export default function getFeed(pageNumber = 1) {
    return axios.get(URLApi + pageNumber, config)
}