import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};


export function postLikePost(idPost) {
    return axios
        .post(`${URLApi}post/like`, {post: {id: idPost}}, {headers: { Authorization: `Bearer ${getItem('Token')}` }});
}