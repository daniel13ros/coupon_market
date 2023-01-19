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
			
            <h3>{props.coupon.description} </h3>
            {/* <span>#{props.task.id}</span> */}
            <hr />
            <span className="category">{props.coupon.category}</span>
            <span className="group">price :{props.coupon.price}$</span>
            <br></br>
            <span>{moment(props.coupon.startDate).format("DD/MM/YY")}</span>
            <span>{moment(props.coupon.endDate).format("DD/MM/YY")}</span>
            
        
        </div>
    );
}

export default CouponItem;
