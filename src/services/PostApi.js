import axios from 'axios';

const pageNumber = 1;
const URLPost = `http://127.0.0.1:8080/api/posts?/page=${pageNumber}`;

export default function getPost(URLPost) {
    return axios.get(URLPost).then((res) => console.log(res.data));
}