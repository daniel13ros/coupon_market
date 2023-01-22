import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
            <div className="flex-row">
                <button className="button1" onClick={() => deleteCustomer(props.customer.id!)}><FaTrash /></button>
                <button className="button1" onClick={() => editCustomer(props.customer.id!)}><FaEdit /></button>
            </div>
            
        
        </div>
    );
}

export default CustomerItem;
