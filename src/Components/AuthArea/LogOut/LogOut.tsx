import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearCompaniesAction, clearCouponAction } from "../../../Redux/CompanyState";
import { clearCustomersAction, clearCustomerCouponAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import { logIn, logOut } from "../../../Redux/UserAppState";
import "./LogOut.css";

function LogOut(): JSX.Element {
    const navigate=useNavigate();
    useEffect(() =>{
    store.dispatch(logOut());
    store.dispatch(clearCompaniesAction());
    store.dispatch(clearCustomersAction());
    store.dispatch(clearCustomerCouponAction());
    store.dispatch(clearCouponAction());
    navigate("/login")
    },[]);

    return (
        <></>
    );
}

export default LogOut;
