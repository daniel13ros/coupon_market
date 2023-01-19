import { Route, Routes } from "react-router";
import "./Routing.css";
import App from "../../../App";
import About from "../../PagesArea/About/About";
import Donate from "../../PagesArea/Donate/Donate";
import Page404 from "../../PagesArea/Page404/Page404";
import Main from "../../LayoutArea/Main/Main";
import Home from "../../PagesArea/Home/Home";
import React from "react";
import Login from "../../AuthArea/Login/Login";
import LogOut from "../../AuthArea/LogOut/LogOut";
import TodoList from "../../UserArea/CustomerArea/CustomerCoupons/CustomerCoupons";
import MyCoupons from "../../UserArea/CustomerArea/CustomerCoupons/CustomerCoupons";
import CompanyCoupons from "../../UserArea/CompanyArea/CompanyCoupons/CompanyCoupons";
import AllCoupons from "../../UserArea/AdminArea/AllCoupons/AllCoupons";
import AllCompanies from "../../UserArea/AdminArea/AllCompanies/AllCompanies";
import AllCustomers from "../../UserArea/AdminArea/AllCustomers/AllCustomers";
import AddCompany from "../../UserArea/AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../UserArea/AdminArea/AddCustomer/AddCustomer";
import DeleteCompany from "../../UserArea/AdminArea/DeleteCompany/DeleteCompany";
import EditCompany from "../../UserArea/AdminArea/EditCompany/EditCompany";
import EditCustomer from "../../UserArea/AdminArea/EditCustomer/EditCustomer";
import DeleteCustomer from "../../UserArea/AdminArea/DeleteCustomer/DeleteCustomer";
import CustomerDetails from "../../UserArea/CustomerArea/CustomerDetails/CustomerDetails";
import CompanyDetails from "../../UserArea/CompanyArea/CompanyDetails/CompanyDetails";
import AddCoupon from "../../UserArea/CompanyArea/AddCoupon/AddCoupon";
import DeleteCoupon from "../../UserArea/CompanyArea/DeleteCoupon/DeleteCoupon";
import EditCoupon from "../../UserArea/CompanyArea/EditCoupon/EditCoupon";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/customer/coupons" element={<MyCoupons />} />
                <Route path="/customer/details" element={<CustomerDetails />} />
                <Route path="/company/details" element={<CompanyDetails />} />
                <Route path="/company/coupons" element={<CompanyCoupons />} />
                <Route path="/company/coupons/addCoupon" element={<AddCoupon />} />
                <Route path="/company/coupons/delete/:id/" element={<DeleteCoupon />} />
                <Route path="/company/coupons/update/:id/" element={<EditCoupon />} />
                <Route path="/admin/coupons" element={<AllCoupons />} />
                <Route path="/admin/companies" element={<AllCompanies />} />
                <Route path="/admin/companies/addCompany" element={<AddCompany />} />
                <Route path="/admin/companies/delete/:id/" element={<DeleteCompany />} />
                <Route path="/admin/companies/update/:id/" element={<EditCompany />} />
                <Route path="/admin/customers/addCustomer" element={<AddCustomer />} />
                <Route path="/admin/customers/delete/:id/" element={<DeleteCustomer />} />
                <Route path="/admin/customers/update/:id/" element={<EditCustomer />} />
                <Route path="/admin/customers" element={<AllCustomers />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
