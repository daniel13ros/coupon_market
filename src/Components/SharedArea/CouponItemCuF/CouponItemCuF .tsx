import moment from "moment";
import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Model/CouponModel";
import notify from "../../../Services/NotificationService";
import webApi from "../../../Services/WebApi";

interface CouponItemProps{
    coupon:CouponModel;
}

function CouponItemCuF(props:CouponItemProps): JSX.Element {
    const navigate = useNavigate();

    const purchaseCoupon = (id:number) => {
        webApi.purchaseCouponApi(id)
        navigate('/home' );
    }
    
    return (
        <div className="CouponItemCuF card">
			
            <div className="top">
            <h3>{props.coupon.title} </h3>
            <span>{props.coupon.description} </span>
            </div>
            <br></br>
            <br></br>
            <div className="mid">
            <span>{props.coupon.category}</span>
            <span>price :{props.coupon.price}$</span>
            </div>
            <div className="low">
            <span>start date:{moment(props.coupon.startDate).format("DD/MM/YY")}</span>
            <span>end date:{moment(props.coupon.endDate).format("DD/MM/YY")}</span>
            </div>
            <div className="flex-center-col">
                <button className="button1" onClick={() => purchaseCoupon(props.coupon.id!)}><GrAdd /></button>
            </div>
        
        </div>
    );
}
export default CouponItemCuF;
