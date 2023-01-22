
import { CustomerModel } from "../../../Model/CustomerModel";

interface CustomerDetailsItemProps{
    customer:CustomerModel;
}

function CustomerDetailsItem(props:CustomerDetailsItemProps): JSX.Element {

    return (
        <div className="CustomerDetailsItem card">
			<h1>Customer info</h1>
            <span>id: {props.customer.id}</span>
            <br />
            <span>name: {props.customer.firstName}</span>
            <br />
            <span>name: {props.customer.lastName}</span>
            <br />
            <span>email: {props.customer.email}</span>
            <br />
            <br />
            <span>type: {props.customer.type}</span>
            <br />
        
        </div>
    );
}

export default CustomerDetailsItem;
