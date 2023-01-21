import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { URL } from "url";
import { CouponModel } from "../../../../Model/CouponModel";
import { getCouponsAction, getCustomerCouponsAction, getCustomersAction } from "../../../../Redux/CustomerState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import EmptyView from "../../../SharedArea/EmptyView/EmptyView";
import TodoItem from "../../../SharedArea/CouponItem/CouponItem";
import { CustomerModel } from "../../../../Model/CustomerModel";
import CustomerItem from "../../../SharedArea/CustomerDetailsItem/CustomerDetailsItem";


function AllCustomers(): JSX.Element {
    const[customers,setCustomers]= useState<CustomerModel[]>(store.getState().customerReducer.customers);
    const [customersSearch, setCustomersSearch] = useState<CustomerModel[]>([]);

    const navigate=useNavigate();
    
    useEffect(() =>{
        const token=store.getState().userReducer.user.token;
        if(!token){
            navigate("/login");   
        }
    },[]);
    
    useEffect( () =>{
            if(customersSearch.length===0){
            webApi.getAllCustomersApi()
            .then(res=>{
                console.log(res.data)
                
                //update local state
                setCustomers(res.data)
                setCustomersSearch(res.data)

                //update app state
                store.dispatch(getCustomersAction(res.data))
                notify.success('wohoo customers found')
                
            })
            .catch(err=>notify.error('ohh no there are no customers'));
        }
                    

    },[]);

    const filter = (e: any) => {
        const search = e.target.value;

        if (search !== '') {
            const results = customers.filter((c) => {
                return c.firstName?.toLowerCase().startsWith(search.toLowerCase())||c.lastName?.toLowerCase().startsWith(search.toLowerCase());
            });
            setCustomersSearch(results);
        } else {
            setCustomersSearch(customers);
        }

    };

    useEffect(() => {
        webApi.getAllCustomersApi().then(res=>setCustomers(res.data))
        .catch(err=>notify.error(err));
    
    
        return store.subscribe(() => {
            setCustomers(store.getState().customerReducer.customers); // Will let us notify
        });
    },[]);


    return (
        <div className="AllCustomers ">
            <h1 className="head">Customers list</h1>
            <div >   
                <input  type={"text"} placeholder={"Search customer by first name "} onChange={filter} /> 
            </div>
            {
                customers?.length>0 
                ? 
                <>{customersSearch.map((c,idx)=> <CustomerItem key={"t"+idx} customer={c}/>)}</> 
                : 
                <EmptyView msg="No customers found"/>
            }
        </div>
    );
}

export default AllCustomers;
