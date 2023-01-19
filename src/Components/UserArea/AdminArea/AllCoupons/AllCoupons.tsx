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
import CouponItemAF from "../../../SharedArea/CouponItemCF/CouponItemCF";
import CouponItem from "../../../SharedArea/CouponItem/CouponItem";
;

function AllCoupons(): JSX.Element {
    const[coupons,setCoupons]= useState<CouponModel[]>(store.getState().customerReducer.coupons);
    const navigate=useNavigate();
    
    useEffect(() =>{
        const token=store.getState().userReducer.user.token;
        if(!token){
            navigate("/login");   
        }
    },[]);
    
    useEffect( () =>{
            if(coupons.length===0){
            webApi.getAllCouponsApi()
            .then(res=>{
                console.log(res.data)
                
                //update local state
                setCoupons(res.data)

                //update app state
                store.dispatch(getCouponsAction(res.data))
                notify.success('coupons found')
                
            })
            .catch(err=>notify.error('ohh no there are no coupons'));
        }
                    

    },[]);

    useEffect(() => {
        webApi.getAllCouponsApi().then(res=>setCoupons(res.data))
        .catch(err=>notify.error(err));
    
    
        return store.subscribe(() => {
            setCoupons(store.getState().customerReducer.coupons); // Will let us notify
        });
    },[]);


    return (
        <div className="AllCoupons ">
            <h1 >Coupons list</h1>
            {
                coupons?.length>0 
                ? 
                <>{coupons.map((c,idx)=> <CouponItem key={"t"+idx} coupon={c}/>)}</> 
                : 
                <EmptyView msg="No tasks found"/>
            }
        </div>
    );
}

export default AllCoupons;
