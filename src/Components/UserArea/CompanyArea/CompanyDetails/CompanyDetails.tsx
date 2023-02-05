import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { URL } from "url";
import { CouponModel } from "../../../../Model/CouponModel";
import { getCustomerCouponsAction } from "../../../../Redux/CustomerState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../../../SharedArea/CouponItem/CouponItem";
import { CustomerModel } from "../../../../Model/CustomerModel";
import { CompanyModel } from "../../../../Model/CompanyModel";
import { addCompanyAction } from "../../../../Redux/CompanyState";
import CompanyDetailsItem from "../../../SharedArea/CompanyDetailsItem/CompanyDetailsItem";
;

function CompanyDetails(): JSX.Element {
  const requiredType = "Company";
  const navigate = useNavigate();
  const params = useParams();
  const companyId = params.companyId;

  const [company, setCompany] = useState<CompanyModel>(store.getState().companyReducer.companies.find((company) => company.id === companyId)!);
  const getCompanyFromServer = async () => {
    await webApi.getCompanyInfoApi()
      .then((res) => {
        notify.success("COMPANY_FETCH_ONE_SUCCESS");
        store.dispatch(addCompanyAction(res.data));
        setCompany(res.data);
      })

      .catch((error) => {
        notify.error(error);
        navigate("/companies");
      });
  };
  (function () {
    if (company === undefined) {
      getCompanyFromServer();
    }
  })();

  useEffect(() => {
    if (!store.getState().userReducer.user.token) {
      notify.error("NO_TOKEN");
      navigate("/login");
    }
    if (!(store.getState().userReducer.user.clientType === requiredType)) {
      notify.error("UNAUTHORIZED_ACTION");
      navigate("/login");
    }
  }, []);

  return (
    <div className="CustomerDetails ">
      <h1 className="head">Company details</h1>
      {
        company ?
          <CompanyDetailsItem company={company} />
          :
          <span>oops, there's a problem getting your information</span>
      } 
    </div>
  );



}

export default CompanyDetails;
