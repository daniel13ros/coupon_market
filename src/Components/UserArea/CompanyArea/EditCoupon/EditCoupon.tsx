import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CompanyModel, CompanyPayloadModel } from "../../../../Model/CompanyModel";
import store from "../../../../Redux/Store";
import webApi from "../../../../Services/WebApi";
import notify from "../../../../Services/NotificationService";
import { updateCompanyAction, updateCouponAction } from "../../../../Redux/CompanyState";
import { CouponModel, CouponPayloadModel } from "../../../../Model/CouponModel";
import { Category } from "../../../../Model/Category";
import { useSelector } from "react-redux";




function EditCoupon(): JSX.Element {



    const params = useParams();
    const couponId = +(params.id || 0)

    const [objCoupon, setObjCoupon] = useState<CouponModel>(store.getState().companyReducer.coupons.filter(coupon => coupon.id === couponId)[0])
    
    const navigate = useNavigate();

    
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
                .min(new Date(Date.now() - 86400_000), "start date in the past")
                .typeError("must specify a starting date")
                .required("must specify a starting date")
                .nullable().default(() => new Date()),
        endDate:
            yup.date()
                .min(new Date(), 'there is not option for previous time')
                .default(new Date())
                .typeError("You must specify a date")
                .required("Date is required")
                .nullable().default(() => new Date(Date.now() + 6.048e+8))
    });


    const putCoupon = async (coupon: CouponPayloadModel) => {
        await webApi.updateCouponApi(coupon, couponId)
            .then(res => {
                notify.success('Coupon updated successfully');
                store.dispatch(updateCouponAction(res.data));
                navigate('/company/coupons');
            })
            .catch(err => {
                notify.error(err);
            })
        
    }
    let defaultValuesObj = { ...objCoupon };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({
        control
    });




    return (
        <div className="EditCoupon">
            <h1>Edit Coupon{couponId}</h1>
            <form onSubmit={handleSubmit(putCoupon)}>
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
                        {Object.keys(Category).map((key, index) => (<option aria-selected="true" key={key} value={key}>{Object.values(Category)[index]}</option>
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
                <button disabled={!isValid || !isDirty}>Update Coupon</button>


            </form>
        </div>
    );
}

export default EditCoupon;