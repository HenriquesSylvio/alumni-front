import axios from 'axios';
import {getItem} from "./LocaleStorage";
import {dark} from "@mui/material/styles/createPalette";

const URLApi = process.env.REACT_APP_API_URL;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"

const config = {
    headers: { Authorization: `Bearer ${getItem('Token')}` }
};

export default function getEvents(pageNumber = 1, date, keyword) {
    let url = `${URLApi}event?current_page=${pageNumber}`
    if (date){
        url = `${url}&date=${date}`
    }
    if (keyword) {
        url = `${url}&keyword=${keyword}`
    }
    return axios.get(url, {headers: { Authorization: `Bearer ${getItem('Token')}` }})
}