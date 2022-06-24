import axios from 'axios';
import {getItem} from "./LocaleStorage";

const URLPost = `http://127.0.0.1:8080/api/post/like`;

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};


export function postLikePost(idPost) {
    return axios
        .post(URLPost, {post: {id: idPost}}, config);
}