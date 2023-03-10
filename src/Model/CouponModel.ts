import { Category } from "./Category";
import { CompanyModel } from "./CompanyModel";

export interface CouponModel{
    id?: number;
    title?: string;
    category?: Category;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    amount?: number;
    price?: number;
    image?: string;
    company?: CompanyModel;  
}

export interface CouponPayloadModel{
    title?: string;
    category?: Category;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    amount?: number;
    price?: number;
    image?: string;
    company?: CompanyModel;  
    
}