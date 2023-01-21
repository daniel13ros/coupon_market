export interface CompanyModel {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    type?: "Company";
}

export interface CompanyPayloadModel {
    name?: string;
    email?: string;
    password?: string;
    type?: "Company";
}