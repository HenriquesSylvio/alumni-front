import axios from 'axios';
import {getItem} from "./LocaleStorage";

// const pageNumber = 1;
// const URLPost = `http://127.0.0.1:8080/api/post/feed?current_page=`;
const URLPost = `http://127.0.0.1:8080/api/post?currentPage=`;

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

// console.log(config);
// return axios
//     .post(URLApi + "posts", credentials, config);

export default function getFeed(pageNumber = 1) {
    return axios.get(URLPost + pageNumber, config)
        // .then(response => {
        //     response.data
        //     // this.setState({posts: response.data['hydra:member']})
        //     // this.setState({pageNumberMax: Math.ceil(response.data['hydra:totalItems']/10)})
        // })
}