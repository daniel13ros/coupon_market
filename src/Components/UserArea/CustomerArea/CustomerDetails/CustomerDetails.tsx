import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { URL } from "url";
import { CouponModel } from "../../../../Model/CouponModel";
import { getCustomerCouponsAction } from "../../../../Redux/CustomerState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../../../SharedArea/CouponItem/CouponItem";
import { CustomerModel } from "../../../../Model/CustomerModel";
;

function CustomerDetails(): JSX.Element {
    return (
        <div className="CustomerDetails ">
            <h1>Customer details</h1>
        
        </div>
    );
 
}

export default CustomerDetails;
