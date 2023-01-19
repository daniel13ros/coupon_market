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
        <div className="CouponItem card">
			
            <h3>{props.coupon.description} </h3>
            <hr />
            <span className="category">{props.coupon.category}</span>
            <span className="group">price :{props.coupon.price}$</span>
            <br></br>
            <span>{moment(props.coupon.startDate).format("DD/MM/YY")}</span>
            <span>{moment(props.coupon.endDate).format("DD/MM/YY")}</span>
            <div className="row">
                <button onClick={() => deleteCoupon(props.coupon.id!)}><FaTrash /></button>
                <button onClick={() => editCoupon(props.coupon.id!)}><FaEdit /></button>
            </div>
        
        </div>
    );
}
export default CouponItemCF;
