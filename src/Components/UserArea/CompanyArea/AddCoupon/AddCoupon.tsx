import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import store from "../../../../Redux/Store";
import { CustomerPayloadModel } from "../../../../Model/CustomerModel";
import webApi from "../../../../Services/WebApi";
import notify from "../../../../Services/NotificationService";
import { addCustomerAction } from "../../../../Redux/CustomerState";
import { CouponModel, CouponPayloadModel } from "../../../../Model/CouponModel";
import { addCouponAction } from "../../../../Redux/CompanyState";
import { CompanyModel } from "../../../../Model/CompanyModel";
import { Category } from "../../../../Model/Category";
function AddCoupon(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }
    }, []);

    const schema = yup.object().shape({
        description:
            yup.string()
                .required("description is required"),
        title:
            yup.string().required("title is missing"),
        category:
            yup.string()
                .required("category is required"),
        amount:
            yup.number()
                .required("amount is required"),
        image:
            yup.string()
                .required("description is required"),
        price:
            yup.number().required("title is missing"),
        startDate:
            yup.date()
                .default(new Date())
                .required("Date is required")
                .nullable().default(() => new Date()),
        endDate:
            yup.date()
                .default(new Date())
                .required("Date is required")
                .nullable().default(() => new Date())
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CouponPayloadModel>({ mode: "all", resolver: yupResolver(schema) });


    const postTask = async (coupon: CouponPayloadModel) => {
        await webApi.addCouponApi(coupon)
            .then(res => {
                notify.success('coupon added successfully');
                store.dispatch(addCouponAction(res.data));
                navigate('/company/coupons');
            })
            .catch(err => {
                notify.error(err);
            })
        console.log(coupon);
    }

    return (
        <div className="AddCoupons">
            <h1 className="head">Add Coupon</h1>
            <form onSubmit={handleSubmit(postTask)}>
                {/* <label htmlFor="companyId">companyId</label> */}
                {/* <input disabled={true} id="companyId" name="companyId" type="number" placeholder="companyId..." value={0} /> */}
                {(errors.title) ? <span>{errors.title?.message}</span> : <label htmlFor="title">title</label>}
                <input {...register("title")} id="title" name="title" type="text" placeholder="title..." />
                {(errors.description) ? <span>{errors.description?.message}</span> : <label htmlFor="description">description</label>}
                <input {...register("description")} id="description" name="description" type="text" placeholder="description..." />
                <label htmlFor="category">category</label>
                <br />
                {(errors.category) ? <span>{errors.category?.message}</span>
                    :
                    <select  {...register("category")} placeholder="category" defaultValue="" id="category">
                        <option value="" disabled>Category</option>
                        {Object.keys(Category).map((key, index) => (
                            <option
                                aria-selected="true"
                                key={key}
                                value={key}
                            >{Object.values(Category)[index]}
                            </option>
                        ))}
                    </select>
                }
                {<br />}
                {(errors.amount) ? <span>{errors.amount?.message}</span> : <label htmlFor="amount">amount</label>}
                <input {...register("amount")} id="amount" name="amount" type="number" placeholder="amount..." />
                {(errors.image) ? <span>{errors.image?.message}</span> : <label htmlFor="image">image</label>}
                <input {...register("image")} id="image" name="image" type="text" placeholder="image..." />
                {(errors.price) ? <span>{errors.price?.message}</span> : <label htmlFor="price">amount</label>}
                <input {...register("price")} id="price" name="price" type="number" placeholder="price..." />
                {(errors.startDate) ? <span>{errors.startDate?.message}</span> : <label htmlFor="startDate">startDate</label>}
                <input {...register("startDate")} id="startDate" name="startDate" type="datetime-local" placeholder="startDate..." />
                {(errors.endDate) ? <span>{errors.endDate?.message}</span> : <label htmlFor="endDate">endDate</label>}
                <input {...register("endDate")} id="endDate" name="endDate" type="datetime-local" placeholder="endDate..." />
                <button disabled={!isValid}>Add Coupon</button>


            </form>
        </div>
    );
}

export default AddCoupon;
