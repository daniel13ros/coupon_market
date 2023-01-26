import { useNavigate, useParams } from "react-router-dom";
import { deleteCustomerAction } from "../../../../Redux/CustomerState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";


function DeleteCustomer(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const navigate = useNavigate();

    const cancel = () => {
        navigate("/admin/customers");
    }

    const yes = async () => {
        await webApi.removeCustomerApi(id)
            .then(res => {
                notify.success('deleted successfully');
                store.dispatch(deleteCustomerAction(id));
                navigate("/admin/customers");
            })
            .catch(err => {
                notify.error(err);
            });
    }
    return (
        <div className="DeleteCustomer col">
            <h3>Attention</h3>
            <div className="wrapper col">
                <div className="row">
                    <p>Are you sure you want to delete customer #{id} ?</p>
                </div>
                <div className="row gap">
                    <button className="button cancel" onClick={cancel}>Cancel</button>
                    <button className="button yes" onClick={yes}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCustomer;
