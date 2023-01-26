import { useNavigate, useParams } from "react-router-dom";
import { deleteCompanyAction } from "../../../../Redux/CompanyState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";


function DeleteCompany(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const navigate = useNavigate();

    const cancel = () => {
        navigate("/admin/companies");
    }

    const yes = async () => {
        await webApi.removeCompanyApi(id)
            .then(res => {
                notify.success('deleted successfully');
                store.dispatch(deleteCompanyAction(id));
                navigate("/admin/companies");
            })
            .catch(err => {
                notify.error(err);
            });
    }
    return (
        <div className="DeleteCompany col">
            <h3>Attention</h3>
            <div className="wrapper col">
                <div className="row">
                    <p>Are you sure you want to delete company #{id} ?</p>
                </div>
                <div className="row gap">
                    <button  className="button cancel" onClick={cancel}>Cancel</button>
                    <button className="button yes" onClick={yes}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCompany;
