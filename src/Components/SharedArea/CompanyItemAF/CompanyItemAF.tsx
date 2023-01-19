import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Model/CompanyModel";
import { CouponModel } from "../../../Model/CouponModel";

interface CompanyItemProps{
    company:CompanyModel;
}

function CompanyItemAF(props:CompanyItemProps): JSX.Element {
    
    const navigate = useNavigate();

    const deleteCompany = (id: number) => {
        navigate('delete/' + id);
    }

    const editCompany = (id: number) => {
        navigate('update/' + id);
    }
    return (
        <div className="CompanyItemAF card">
			
            <h2>{props.company.id} </h2>
            <h3>{props.company.name} </h3>
            <span className="email">{props.company.email}</span>
            <div className="row">
                <button onClick={() => deleteCompany(props.company.id!)}><FaTrash /></button>
                <button onClick={() => editCompany(props.company.id!)}><FaEdit /></button>
            </div>
            
        
        </div>
    );
}

export default CompanyItemAF;
