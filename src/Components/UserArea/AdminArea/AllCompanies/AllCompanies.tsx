import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { URL } from "url";
import { CouponModel } from "../../../../Model/CouponModel";
import { getCouponsAction, getCustomerCouponsAction } from "../../../../Redux/CustomerState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../../../SharedArea/CouponItem/CouponItem";
import { CompanyModel } from "../../../../Model/CompanyModel";
import { getCompaniesAction } from "../../../../Redux/CompanyState";
import CompanyItem from "../../../SharedArea/CompanyItem/CompanyItem";
import CompanyItemAF from "../../../SharedArea/CompanyItemAF/CompanyItemAF";
import AddCompany from "../AddCompany/AddCompany";
;

function AllCompanies(): JSX.Element {
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().companyReducer.companies);
    const [companiesSearch, setCompaniesSearch] = useState<CompanyModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (companiesSearch.length === 0) {
            webApi.getAllCompaniesApi()
                .then(res => {
                    
                    //update local state
                    setCompanies(res.data)
                    setCompaniesSearch(res.data)

                    //update app state
                    store.dispatch(getCompaniesAction(res.data))
                    notify.success('Companies found')

                })
                .catch(err => notify.error('ohh no there are no companies'));
        }


    }, []);


    useEffect(() => {
        webApi.getAllCompaniesApi().then(res => setCompanies(res.data))
            .catch(err => notify.error(err));

        return store.subscribe(() => {
            setCompanies(store.getState().companyReducer.companies);
        });
    }, []);

    const filter = (e: any) => {
        const search = e.target.value;

        if (search !== '') {
            const results = companies.filter((c) => {
                return c.name?.toLowerCase().startsWith(search.toLowerCase());
            });
            setCompaniesSearch(results);
        } else {
            setCompaniesSearch(companies);
        }

    };
    
    return (
        <div className="AllCompanies ">
            <h1 className="head" >Companies list</h1> 
            <div >            
                <input  type={"text"} placeholder={"Search company by name "} onChange={filter} /> 
            </div>
            {
                companies?.length > 0
                    ?
                    <>{companiesSearch.map((c, idx) => <CompanyItemAF key={"t" + idx} company={c} />)}</>
                    :
                    <EmptyView msg="No Companies found" />
            }
        </div>
    );
}

export default AllCompanies;
