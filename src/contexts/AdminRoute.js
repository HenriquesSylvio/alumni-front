import React, {useContext} from "react";
import Auth from "./Auth";
import {Navigate, Outlet } from "react-router-dom";
import * as PropTypes from "prop-types";
import {getItem} from "../services/LocaleStorage";

Navigate.propTypes = {to: PropTypes.string};
export default function AdminRoute() {
    // const {isAdmin} = useContext(AdminRoute);

    return JSON.parse(atob(getItem('Token').split('.')[1])).roles.some(item => item === 'ROLE_ADMIN' || item === 'ROLE_SUPER_ADMIN') ? <Outlet /> : <Navigate to="/" />;
}
