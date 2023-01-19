import { combineReducers, createStore } from "redux";
import { CompanyReducer } from "./CompanyState";
import { CustomerReducer } from "./CustomerState";
import { UserAppState, userReducer } from "./UserAppState";

const reducers = combineReducers({customerReducer: CustomerReducer,  companyReducer :CompanyReducer,userReducer:userReducer});
const store = createStore(reducers) 

export default store;