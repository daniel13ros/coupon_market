import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./Menu.css";

function Menu(): JSX.Element {
  const navigation = useNavigate();
  const type = store.getState().userReducer.user.clientType;


  return (
    <div className="Menu flex-col-top-center">
      <h1 >Menu</h1>
      {type === "Administrator" && (
        <CustomLink to="/home">Home</CustomLink>
      )}
      {type === "Administrator" && (
        <CustomLink to="/admin/companies">Companies</CustomLink>
      )}
      {type === "Administrator" && (
        <CustomLink to="/admin/companies/addCompany">Add company</CustomLink>
      )}
      {type === "Administrator" && (
        <CustomLink to="/admin/customers">Customers</CustomLink>
      )}
      {type === "Administrator" && (
        <CustomLink to="/admin/customers/addCustomer">Add customer</CustomLink>
      )}
      {type === "Administrator" && (
        <CustomLink to="/admin/coupons">Coupons</CustomLink>
      )}
      {type === 'Company' && (
        <CustomLink to="/home">Home</CustomLink>
      )}
      {type === 'Company' && (
        <CustomLink to="/company/coupons">Coupons</CustomLink>
      )}
      {type === 'Company' && (
        <CustomLink to="/company/coupons/addCoupon">Add coupon</CustomLink>
      )}
      {type === 'Company' && (
        <CustomLink to="/company/details">profile</CustomLink>
      )}
      {type === 'Customer' && (
        <CustomLink to="/home">Home</CustomLink>
      )}
      {type === 'Customer' && (
        <CustomLink to="/customer/purchase">Purchase</CustomLink>
      )}
      {type === 'Customer' && (
        <CustomLink to="/customer/coupons">my coupons</CustomLink>
      )}
      {type === 'Customer' && (
        <CustomLink to="/customer/details">profile</CustomLink>
      )}
    </div>
  );
}

export default Menu;
