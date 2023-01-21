import axios, { AxiosResponse } from 'axios';
import { Credentials, User } from '../Model/Auth';
import { Category } from '../Model/Category';
import { CompanyModel, CompanyPayloadModel } from '../Model/CompanyModel';
import { CouponModel, CouponPayloadModel } from '../Model/CouponModel';
import { CustomerModel, CustomerPayloadModel } from '../Model/CustomerModel';
import store from '../Redux/Store';
import tokenAxios from './AxiosToken';
import global from './ConstantService';
class WebApi {

    private adminApi = global.urls.admin;
    private customerApi = global.urls.customers;
    private companyApi = global.urls.companies;

    

    public login(credentials:Credentials): Promise<AxiosResponse<User>> {
        switch(credentials.clientType)
        {
        case 'Customer':
            return axios.post<User>(this.customerApi+"/"+"login",credentials);
        case 'Company':
            return axios.post<User>(this.companyApi+"/"+"login",credentials);
        }
        return axios.post<User>(this.adminApi+"/"+"login",credentials);
    }

    //CUSTOMER FUNCTIONS
    public purchaseCouponApi(couponId: number) {
        return tokenAxios.post<CouponModel>(this.customerApi + "/purchase/" + couponId);
    }
    public customerGetAllCouponsByCategoryApi(category: Category) {
        return  tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons/category", {params: { category: category }});
    }
    public customerGetAllCouponsPriceLessThan(price: number) :Promise<AxiosResponse<any>>{ 
        return  tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons/price?price=" + price);
    }
    public getCustomerInfoApi() {
        return tokenAxios.get<CustomerModel>(this.customerApi +"/details");
    }
    public getAllCustomerCouponsApi() {
        return tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons");
    }

    //COMPANY FUNCTIONS
    public addCouponApi(coupon: CouponPayloadModel) {
        return  tokenAxios.post<CouponModel>(this.companyApi+"/coupons", coupon);
    }
    
    public updateCouponApi(coupon: CouponPayloadModel, couponId: number) {
        return  tokenAxios.put<CouponModel>(this.companyApi+"/coupons/"+ couponId, coupon)
    }
    
    public removeCouponApi(couponId: number) {
        return  tokenAxios.delete<any>(this.companyApi+"/coupons/"+couponId);
    }
    
    public getAllCompanyCouponsApi() {
        return  tokenAxios.get<CouponModel[]>(this.companyApi+"/coupons/");
    }
    
    public companyGetAllCouponsByCategoryApi(category: Category) {
        return  tokenAxios.get<CouponModel[]>(this.companyApi+"/coupons/category?category="+category);
    }
    
    public companyGetAllCouponsPriceLessThan(price : number) {
        return  tokenAxios.get<CouponModel[]>(this.companyApi+"/coupons/price?price="+price);
    }
    
    public getCompanyInfoApi() {
        return  tokenAxios.get<CompanyModel>(this.companyApi+"/details");
    }

    //ADMIN FUNCTIONS
    public addCompanyApi(company: CompanyPayloadModel) {
        return  tokenAxios.post<CompanyModel>(this.adminApi+"/companies", company)
    }
    public updateCompanyApi(company: CompanyPayloadModel, companyId: number) {
        return  tokenAxios.put<CompanyModel>(this.adminApi+"/companies/"+companyId, company);
    }
    public removeCompanyApi(companyId: number) {
        return  tokenAxios.delete<any>(this.adminApi+"/companies/"+companyId);
    }
    public getAllCompaniesApi() {
        return  tokenAxios.get<CompanyModel[]>(this.adminApi+"/companies");
    }
    public getCompanyApi(companyId: number) {
        return  tokenAxios.get<CompanyModel>(this.adminApi+"/companies/"+companyId);
    }
    public addCustomerApi(customer: CustomerPayloadModel) {
        return  tokenAxios.post<CustomerModel>(this.adminApi+"/customers/", customer)
    }
    public updateCustomerApi(customer: CustomerPayloadModel, customerId: number) {
        return  tokenAxios.put<CustomerModel>(this.adminApi+"/customers/"+customerId, customer);
    }
    public removeCustomerApi(customerId: number) {
        return  tokenAxios.delete<any>(this.adminApi+"/customers/"+customerId);
    }
    public getAllCustomersApi() {
        return  tokenAxios.get<CustomerModel[]>(this.adminApi+"/customers");
    }
    public getCustomerApi(customerId: number) {
        return  tokenAxios.get<CustomerModel>(this.adminApi+"/customers/"+customerId);
    }
    public getAllCouponsApi() {
        return  tokenAxios.get<CouponModel[]>(this.adminApi+"/coupons");
    }
    public customerGetAllCouponsApi() {
        return  tokenAxios.get<CouponModel[]>(this.customerApi+"/coupons/all");
    }

}

const webApi = new WebApi();
export default webApi;