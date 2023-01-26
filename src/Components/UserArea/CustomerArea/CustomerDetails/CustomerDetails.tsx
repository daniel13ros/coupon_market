import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { URL } from "url";
import { CouponModel } from "../../../../Model/CouponModel";
import { addCustomerAction, getCustomerCouponsAction } from "../../../../Redux/CustomerState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../../../SharedArea/CouponItem/CouponItem";
import { CustomerModel } from "../../../../Model/CustomerModel";
import CustomerDetailsItem from "../../../SharedArea/CustomerDetailsItem/CustomerDetailsItem";
;

function CustomerDetails(): JSX.Element {

  const requiredType = "Customer";
  const navigate = useNavigate();
  const params=useParams();
  const customerId = params.customerId;

  const [customer, setCustomer] = useState<CustomerModel>(store.getState().customerReducer.customers.find((customer) => customer.id === customerId)!);
  const getCustomerFromServer = async () => {
    await webApi.getCustomerInfoApi()
    .then((res) => {
        store.dispatch(addCustomerAction(res.data));
        setCustomer(res.data);
      })

      .catch((error) => {
        navigate("/customers");
      });
  };
  (function () {
    if (customer === undefined) {
      getCustomerFromServer();
    }
  })();

  useEffect(() => {
    if (!store.getState().userReducer.user.token) {
      navigate("/login");
    }
    if (!(store.getState().userReducer.user.clientType === requiredType)) {
      navigate("/login");
    }
  }, []);

    return (
        <div className="CustomerDetails ">
            <h1 className="head">Customer details</h1>
            {
                customer?
                <CustomerDetailsItem customer={customer}/>
                :
                <span>oops, there's a problem getting your information</span>
            }
        </div>
    );
 
}

export default CustomerDetails;
