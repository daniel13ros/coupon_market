import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import store from "../../../../Redux/Store";
import { CompanyModel, CompanyPayloadModel } from "../../../../Model/CompanyModel";
import webApi from "../../../../Services/WebApi";
import notify from "../../../../Services/NotificationService";
import { addCompanyAction } from "../../../../Redux/CompanyState";
function AddTodo(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() =>{
        const token=store.getState().userReducer.user.token;
        if(!token){
            navigate("/login");
            
        }
    },[]);

    const schema = yup.object().shape({
        email:
            yup.string()
                .email("Invalid email address")
                .required("email is required"),
        name:
            yup.string().required("name is missing"),
        password:
            yup.string()
                .min(4,"password must be at least 4 characters")
                .required("password is required"),
                
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CompanyPayloadModel>({ mode: "all", resolver: yupResolver(schema) });


    const postTask = async (company: CompanyPayloadModel) => {
        await webApi.addCompanyApi(company)
            .then(res => {
                notify.success('company added successfully');
                store.dispatch(addCompanyAction(res.data));
                navigate('/admin/companies');
            })
            .catch(err => {
                notify.error(err);
            })
        console.log(company);
    }
    return (
        <div className="AddCompany">
            <h1>Add Company</h1>
            <form onSubmit={handleSubmit(postTask)}>
                {(errors.name) ? <span>{errors.name?.message}</span> : <label htmlFor="name">Name</label>}
                <input {...register("name")} id="name" name="name" type="text" placeholder="Name..." />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="text" placeholder="email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />
                <button disabled={!isValid}>Add Task</button>


            </form>
        </div>
    );
}

export default AddTodo;
