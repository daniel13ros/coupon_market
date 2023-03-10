import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Model/CouponModel";

interface CouponItemProps{
    coupon:CouponModel;
}

function CouponItem(props:CouponItemProps): JSX.Element {
    return (
        <div className="CouponItem card">
			<div className="top">
            <h3>{props.coupon.title} </h3>
            <span>{props.coupon.description} </span>
            </div>
            <br/>
            <div className="head">
            <img className="coupon-img" src={props.coupon.image} alt="coupon image"/>
            </div>            
            <div className="mid">
            <span>{props.coupon.category}</span>
            <span>price :{props.coupon.price}$</span>
            </div>
            <div className="low">
            <span>start date:{moment(props.coupon.startDate).format("DD/MM/YY")}</span>
            <span>end date:{moment(props.coupon.endDate).format("DD/MM/YY")}</span>
            </div>
            <br/>
            
            
            
            
        
        </div>
    );
}

export default CouponItem;
