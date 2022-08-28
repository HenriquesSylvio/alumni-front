import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export default function getCommentByIdApi(id, pageNumber = 1) {
    return axios.get(`${URLApi}post/${id}/comment?current_page=${pageNumber}`, {headers: { Authorization: `Bearer ${getItem('Token')}` }})
}