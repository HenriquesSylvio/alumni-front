import React, {useContext} from "react";
import Auth from "./Auth";
import {Navigate, Outlet } from "react-router-dom";
import * as PropTypes from "prop-types";

Navigate.propTypes = {to: PropTypes.string};
export default function AdminRoute() {
    const {isAdmin} = useContext(AdminRoute);

    return isAdmin ? <Outlet /> : <Navigate to="/" />;
}
