import { useForm ,useFormState} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CompanyModel, CompanyPayloadModel } from "../../../../Model/CompanyModel";
import store from "../../../../Redux/Store";
import webApi from "../../../../Services/WebApi";
import notify from "../../../../Services/NotificationService";
import { updateCompanyAction } from "../../../../Redux/CompanyState";




function EditCompany(): JSX.Element {



    const params = useParams();
    const id = +(params.id || 0)
    const [obj, setObj] = useState<CompanyModel>(store.getState().companyReducer.companies.filter(company => company.id === id)[0])

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email:
            yup.string()
                .required("email is required"),
        name:
            yup.string().required("name is missing"),
        password:
            yup.string()
                .required("password is required"),
    });


    const putTask = async (company: CompanyPayloadModel) => {
        await webApi.updateCompanyApi(company,id)
            .then(res => {
                notify.success('company updated successfully');
                store.dispatch(updateCompanyAction(res.data));
                navigate('/admin/companies');
            })
            .catch(err => {
                notify.error(err);
            })
        console.log(company);
    }


    let defaultValuesObj = { ...obj };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({
        control
    });




    return (
        <div className="EditCompany">
            <h1 className="head">Edit Company</h1>
            <form onSubmit={handleSubmit(putTask)}>
                <input disabled={true} id="id" name="id" type="number" placeholder="Id..." value={id} />

                {(errors.name) ? <span>{errors.name?.message}</span> : <label htmlFor="name">Name</label>}
                <input {...register("name")} id="name" name="name" type="text" placeholder="Name..." />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="text" placeholder="email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="text" placeholder="Password..." />
                <button disabled={!isValid || !isDirty}>Update Company</button>


            </form>
        </div>
    );
}

export default EditCompany;