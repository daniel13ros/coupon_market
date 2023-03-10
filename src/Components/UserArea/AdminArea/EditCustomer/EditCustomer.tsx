import { useForm ,useFormState} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import { localeData } from "moment";

import { useContext, useState } from "react";
import { CustomerModel, CustomerPayloadModel } from "../../../../Model/CustomerModel";
import store from "../../../../Redux/Store";
import webApi from "../../../../Services/WebApi";
import notify from "../../../../Services/NotificationService";
import { updateCustomerAction } from "../../../../Redux/CustomerState";





function EditTodo(): JSX.Element {



    const params = useParams();
    const id = +(params.id || 0)

    const [obj, setObj] = useState<CustomerModel>(store.getState().customerReducer.customers.filter(customer => customer.id === id)[0])

    const navigate = useNavigate();

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
                .required("password is required")
    });


    const putCustomer = async (customer: CustomerPayloadModel) => {
        await webApi.updateCustomerApi(customer,id)
            .then(res => {
                notify.success('customer updated successfully');
                store.dispatch(updateCustomerAction(res.data));
                navigate('/admin/customers');
            })
            .catch(err => {
                notify.error(err);
            })
        }


   
    let defaultValuesObj = { ...obj };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({
        control
    });




    return (
        <div className="EditCustomer">
            <h1 className="head" >Edit Customer</h1>
            <form onSubmit={handleSubmit(putCustomer)}>
                <input disabled={true} id="id" name="id" type="number" placeholder="Id..." value={id} />

                {(errors.firstName) ? <span>{errors.firstName?.message}</span> : <label htmlFor="firstName">FirstName</label>}
                <input {...register("firstName")} id="firstName" name="firstName" type="text" placeholder="FirstName..." />
                {(errors.lastName) ? <span>{errors.lastName?.message}</span> : <label htmlFor="lastName">LastName</label>}
                <input {...register("lastName")} id="lastName" name="lastName" type="text" placeholder="LastName..." />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="text" placeholder="Email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="text" placeholder="Password..." />
                <button disabled={!isValid || !isDirty}>Update customer</button>


            </form>
        </div>
    );
}

export default EditTodo;