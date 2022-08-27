import React, {useContext} from "react";
import Auth from "./Auth";
import {Navigate, Outlet } from "react-router-dom";
import * as PropTypes from "prop-types";

Navigate.propTypes = {to: PropTypes.string};
export default function NoConnectedRoute() {
    const {isAuthenticated} = useContext(Auth);

    return !isAuthenticated ? <Outlet /> : <Navigate to="/feed" />;
}
