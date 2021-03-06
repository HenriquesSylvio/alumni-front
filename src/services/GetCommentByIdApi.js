import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = "http://127.0.0.1:8080/api/"
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export default function getCommentByIdApi(id, pageNumber = 1) {
    return axios.get(`${URLApi}post/${id}/comment?current_page=${pageNumber}`, config)
}