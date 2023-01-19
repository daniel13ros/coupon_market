import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Model/CompanyModel";
import { CouponModel } from "../../../Model/CouponModel";

interface CompanyItemProps{
    company:CompanyModel;
}

function CompanyItem(props:CompanyItemProps): JSX.Element {
    return (
        <div className="CompanyItem card">
			
            <h2>{props.company.id} </h2>
            <h3>{props.company.name} </h3>
            <span className="email">{props.company.email}</span>
            
            
        
        </div>
    );
}

export default CompanyItem;
