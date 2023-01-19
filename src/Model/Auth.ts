export interface LoginRequestModal{
    email: string;
    password: string;
    clientType: string;
}

export interface LoginResponseModel {
    token?: string;
    id?: number;
    email?: string;
    password?: string;
    clientType: string;
}


export interface Credentials{
    email: string;
    password: string;
    clientType: string;

}

export interface User{
    token: string;
    email: string;
    clientType: string;

}