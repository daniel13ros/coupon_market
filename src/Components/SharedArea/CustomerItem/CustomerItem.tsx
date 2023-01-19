import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Model/CouponModel";
import { CustomerModel } from "../../../Model/CustomerModel";

interface CustomerItemProps{
    customer:CustomerModel;
}

function CustomerItem(props:CustomerItemProps): JSX.Element {
   
    const navigate = useNavigate();

    const deleteCustomer = (id: number) => {
        navigate('delete/' + id);
    }

    const editCustomer = (id: number) => {
        navigate('update/' + id);
    }
    return (
        <div className="CustomerItem card">
			
            <h3>{props.customer.firstName} </h3>
            <hr />
            <span>{props.customer.lastName}</span>
            <span className="email">{props.customer.email}</span>
            <div className="row">
                <button onClick={() => deleteCustomer(props.customer.id!)}><FaTrash /></button>
                <button onClick={() => editCustomer(props.customer.id!)}><FaEdit /></button>
            </div>
            
        
        </div>
    );
}

export default CustomerItem;
