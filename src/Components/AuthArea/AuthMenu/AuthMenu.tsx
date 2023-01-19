import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../Model/Auth";
import { CustomerModel } from "../../../Model/CustomerModel";
import store from "../../../Redux/Store";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user,setUser]=useState<User>(store.getState().userReducer.user);

    
    useEffect(() =>{
        return store.subscribe(()=>setUser(store.getState().userReducer.user));
        
        
    },[]);
    
    return (
        <div className="AuthMenu row">
			{
                (user?.token)?
                <>Hello {user.email}<CustomLink  to="logout">Logout</CustomLink></>
                :
                <>Hello {user.email}<CustomLink to="login">Login</CustomLink></>
            }
            
        </div>
    );
}

export default AuthMenu;
