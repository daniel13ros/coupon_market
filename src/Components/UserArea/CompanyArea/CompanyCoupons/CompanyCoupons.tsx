import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from "react-router-dom";
import { URL } from "url";
import { CouponModel } from "../../../../Model/CouponModel";
import { CompanyState, getCompanyCouponsAction } from "../../../../Redux/CompanyState";
import { getCustomerCouponsAction } from "../../../../Redux/CustomerState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../../../SharedArea/CouponItem/CouponItem";
import CouponItemCF from "../../../SharedArea/CouponItemCF/CouponItemCF";
;

function CompanyCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);
    const [couponsSearch, setCouponsSearch] = useState<CouponModel[]>([]);
    const [category, setCategory] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }
    }, []);



    useEffect(() => {
        if (couponsSearch.length === 0) {
            webApi.getAllCompanyCouponsApi()
                .then(res => {

                    //update local state
                    setCoupons(res.data)
                    setCouponsSearch(res.data)

                    //update app state
                    store.dispatch(getCompanyCouponsAction(res.data))
                    notify.success('Coupons found')

                })
                .catch(err => notify.error('ohh no there are no coupons'));
        }
    }, []);

    useEffect(() => {
        webApi.getAllCompanyCouponsApi().then(res => {setCoupons(res.data);})
            .catch(err => notify.error(err));
        
            return store.subscribe(() => {setCoupons(store.getState().companyReducer.coupons);});
    }, []);

    const handlerSearch = () => {
        const newData =
            coupons
                .filter(c => c.category === (category === '' ? c.category : category))
        setCouponsSearch(newData);
    }

    return (
        <div className="CompanyCoupons ">
            <h1 className="head">Coupons list</h1>
            <div className="selectArea">
                <select  onChange={(e) => setCategory(e.target.value)}>
                    <option value={''}>-All-</option>
                    <option value={'Electronics'}>Electronics</option>
                    <option value={'Restaurants'}>Restaurants</option>
                    <option value={'Travel'}>Travel</option>
                    <option value={'Gifts'}>Gifts</option>
                    <option value={'Shoes'}>Shoes</option>
                </select>
                <button className="button" onClick={() => handlerSearch()} >search</button>
            </div>
            {
                coupons?.length > 0
                    ?
                    <>{couponsSearch.map((c, idx) => <CouponItemCF key={"t" + idx} coupon={c} />)}</>
                    :
                    <EmptyView msg="No tasks found" />
            }
        </div>
    );

}


export default CompanyCoupons;
