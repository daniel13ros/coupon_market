import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../Model/Auth";
import { CustomerModel } from "../../../Model/CustomerModel";
import store from "../../../Redux/Store";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<User>(store.getState().userReducer.user);
    const [email, setEmail] = useState(store.getState().userReducer.user?.email);


    useEffect(() => {
        return store.subscribe(() => {
            setUser(store.getState().userReducer.user)
            setEmail(store.getState().userReducer.user?.email);

        });

    }, []);

    return (
        <div className="AuthMenu row">
            
            {
                (user?.token) 
                ?
                <>Hello {user.email||"admin"}<CustomLink to="logout">Logout</CustomLink></>
                :
                <>Hello Guest<CustomLink to="login">Login</CustomLink></>
                
            }
            
        </div>
    );
}

export default AuthMenu;
