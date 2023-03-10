import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import store from "../../../../Redux/Store";
import { CustomerPayloadModel } from "../../../../Model/CustomerModel";
import webApi from "../../../../Services/WebApi";
import notify from "../../../../Services/NotificationService";
import { addCustomerAction } from "../../../../Redux/CustomerState";
function AddTodo(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() =>{
        const token=store.getState().userReducer.user.token;
        if(!token){
            navigate("/login");
            
        }
    },[]);

    const schema = yup.object().shape({
        firstName:
            yup.string()
                .required("first name is required"),
        lastName:
            yup.string().required("last name is missing"),
        email:
            yup.string()
                .email("must be email format")
                .required("group is required"),
        password:
            yup.string()
                .min(4,"must be 4 characters")
                .required("password is required")
                
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CustomerPayloadModel>({ mode: "all", resolver: yupResolver(schema) });


    const postTask = async (customer: CustomerPayloadModel) => {
        customer.type="Customer"
        await webApi.addCustomerApi(customer)
            .then(res => {
                notify.success('customer added successfully');
                store.dispatch(addCustomerAction(res.data));
                navigate('/admin/customers');
            })
            .catch(err => {
                notify.error(err);
            })
        
    }
    return (
        <div className="AddCustomer">
            <h1 className="head">Add Customer</h1>
            <form onSubmit={handleSubmit(postTask)}>
                {(errors.firstName) ? <span>{errors.firstName?.message}</span> : <label htmlFor="firstName">FirstName</label>}
                <input id="firstName" name="firstName" type="text" placeholder="FirstName..." />
                {(errors.lastName) ? <span>{errors.lastName?.message}</span> : <label htmlFor="lastName">LastName</label>}
                <input id="lastName" name="lastName" type="text" placeholder="LastName..." />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input id="email" name="email" type="text" placeholder="Email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input id="password" name="password" type="password" placeholder="Password..." />
                <input  disabled={true}  id="clientType" name="clientType" type="text" value={"Customer"} />
                <button className="button" disabled={!isValid}>Add Customer</button>


            </form>
        </div>
    );
}

export default AddTodo;
