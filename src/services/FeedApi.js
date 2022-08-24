import axios from 'axios';
import {getItem} from "./LocaleStorage";

// const pageNumber = 1;
// const URLPost = `http://127.0.0.1:8080/api/post/feed?current_page=`;
const URLApi = `${process.env.REACT_APP_API_URL}post/feed?current_page=`;
// const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/post/feed?current_page="
// const config = {
//     headers: {Authorization: `Bearer ${getItem('Token')}`}
// };

export default async function getFeed(pageNumber = 1) {
    // console.log(getItem('Token'));
    return await axios.get(URLApi + pageNumber, {headers: {Authorization: `Bearer ${getItem('Token')}`}})
}