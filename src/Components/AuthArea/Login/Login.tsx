import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import webApi from "../../../Services/WebApi";
import notify from "../../../Services/NotificationService";
import { logIn } from "../../../Redux/UserAppState";
import store from "../../../Redux/Store";
import { useNavigate } from "react-router-dom";
import React from "react";
import { LoginRequestModal } from "../../../Model/Auth";

function Login(): JSX.Element {

    const navigate = useNavigate();
    const schema = yup.object().shape({
        email:
            yup.string()
                .email("Invalid email address")
                .required("email is required"),
        password:
            yup.string()
                .min(4, "password must be at least 4 characters")
                .required("password is required")
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<LoginRequestModal>({ mode: "all", resolver: yupResolver(schema) });

    const postLogin = async (object: LoginRequestModal) => {
        const credentials = { email: object.email, password: object.password, clientType: object.clientType }
        await webApi.login(credentials)
            .then(res => {
                notify.success("login successfully");
                store.dispatch(logIn(res.data))
                navigate("/home")
            })
            .catch(err => notify.error("wrong email or password or client type"))
    }

    return (

        <div className="Login">
            <h2 className="head">Login</h2>
            <form onSubmit={handleSubmit(postLogin)}>
                {(!errors.email) ? <label htmlFor="email">Email</label> : <span>{errors.email.message}</span>}
                <input {...register("email")} id="email" type="email" placeholder="email" />
                {(!errors.password) ? <label htmlFor="password">Password</label> : <span>{errors.password.message}</span>}
                <input {...register("password")} id="password" type="password" placeholder="password" />
                <select {...register("clientType")} name="clientType" id="clientType" placeholder="clientType">
                    <option value="clientType" disabled>Client Type</option>
                    <option value="Administrator">Admin</option>
                    <option value="Company">Company</option>
                    <option value="Customer">Customer</option>
                </select>
                <button disabled={!isValid}>Login</button>
            </form>
        </div>
    );
}

export default Login;
