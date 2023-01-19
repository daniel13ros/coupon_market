import { useNavigate, useParams } from "react-router-dom";
import { deleteCompanyAction, deleteCouponAction } from "../../../../Redux/CompanyState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";


function DeleteCoupon(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const navigate = useNavigate();

    const cancel = () => {
        navigate("/company/coupons");
    }

    const yes = async () => {
        await webApi.removeCouponApi(id)
            .then(res => {
                notify.success('deleted successfully');
                store.dispatch(deleteCouponAction(id));
                navigate("/company/coupons");
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
                    <p>Are you sure you want to delete coupon #{id} ?</p>
                </div>
                <div className="row gap">
                    <button className="cancel" onClick={cancel}>Cancel</button>
                    <button className="yes" onClick={yes}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCoupon;
