export interface CustomerModel {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    type?: "Customer";
}

export interface CustomerPayloadModel {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    type?: "Customer";

}
