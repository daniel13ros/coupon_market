
import { CompanyModel } from "../../../Model/CompanyModel";
import { CustomerModel } from "../../../Model/CustomerModel";

interface CompanyItemProps{
    company:CompanyModel;
}

function CompanyDetailsItem(props:CompanyItemProps): JSX.Element {

    return (
        <div className="CompanyDetailsItem card head ">
			<h1 >Company information</h1>
            <span>id: {props.company.id}</span>
            <br />
            <span>name: {props.company.name}</span>
            <br />
            <span>email: {props.company.email}</span>
            <br />
            <span>type: {props.company.type}</span>
            <br />
            
        
        </div>
    );
}

export default CompanyDetailsItem;
