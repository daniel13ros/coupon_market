import moment from "moment";
import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Model/CouponModel";
import { purchaseCouponAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";

interface CouponItemProps {
    coupon: CouponModel;
}

function CouponItemCuF(props: CouponItemProps): JSX.Element {
    const navigate = useNavigate();

    const ownCoupon = (couponId: number) => {
        return store.getState().customerReducer.customerCoupons.filter(coupon => coupon.id === couponId).length > 0;
    }
    const purchaseCoupon = (id: number) => {
        webApi.purchaseCouponApi(id).then(() => {
            notify.success("Coupon successfully purchased");
            store.dispatch(purchaseCouponAction(id));
        }).catch((error) => {
            notify.error("already purchased");
        })
        navigate('/customer/coupons');
    }

    return (
        <div className="CouponItemCuF card">

            <div className="top">
                <h3>{props.coupon.title} </h3>
                <span>{props.coupon.description} </span>
            </div>
            <br />
            <div className="head">
                <img className="coupon-img" src={props.coupon.image} alt="coupon image" />
            </div>
            <div className="mid">
                <span>{props.coupon.category}</span>
                <span>price :{props.coupon.price}$</span>
            </div>
            <div className="low">
                <span>start date:{moment(props.coupon.startDate).format("DD/MM/YY")}</span>
                <span>end date:{moment(props.coupon.endDate).format("DD/MM/YY")}</span>
            </div>
            <div className="flex-center-col">
                <button className="button1 marge-top" disabled={ownCoupon(props.coupon.id||0)} onClick={() => purchaseCoupon(props.coupon.id!)}>purchase <GrAdd /></button>
            </div>

        </div>
    );
}
export default CouponItemCuF;
