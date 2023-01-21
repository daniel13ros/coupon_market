import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Model/CouponModel";

interface CouponItemProps{
    coupon:CouponModel;
}

function CouponItemCF(props:CouponItemProps): JSX.Element {
    const navigate = useNavigate();

    const deleteCoupon = (id: number) => {
        navigate('delete/' + id);
    }

    const editCoupon = (id: number) => {
        navigate('update/' + id);
    }
    
    return (
        <div className="CouponItemCF card">
			
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
            <div className="flex-row">
                <button className="button1" onClick={() => deleteCoupon(props.coupon.id!)}><FaTrash /></button>
                <button className="button1" onClick={() => editCoupon(props.coupon.id!)}><FaEdit /></button>
            </div>
        
        </div>
    );
}
export default CouponItemCF;
