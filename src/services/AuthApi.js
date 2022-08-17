import axios from 'axios';
import jwtDecode from "jwt-decode";
import { getItem, addItem, removeItem } from "./LocaleStorage";

const URLApi = `http://127.0.0.1:8080/api/`;
// const URLApi = "https://alumni-nws-api.herokuapp.com/api/"
export function hasAuthenticated() {
    const token = getItem('Token');
    const result = token ? tokenIsValid(token) : false;

    if (false === result) {
        removeItem('Token');
    }

    return result;
}

export function login(credentials) {
    return axios
        .post(URLApi + "login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            // console.log(token);
            addItem('Token',token);
            return true;
        });
}

export function logout() {
    removeItem('Profile')
    removeItem('Token')
}

function tokenIsValid(token) {
    const {exp} = jwtDecode(token);

    if (exp * 1000 > new Date().getTime())
    {
        return true;
    }

    return false;
}