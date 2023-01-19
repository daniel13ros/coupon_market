import { User } from "../Model/Auth";

export class UserAppState {
    // Step 1 - create the app state object
    public user: User = {email: "", token: "",clientType: "",};
}

// Step 2 - define all required actions
export enum ActionType {
   LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT",
    REGISTER = "REGISTER",
    
}

// Step 3 - define what is action in terms of data
export interface UserAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function logIn(user: User): UserAction {
    return { type: ActionType.LOGGED_IN, payload: user };
}

export function logOut(): UserAction {
    return { type: ActionType.LOGGED_OUT, payload: {} };
}

export function register(): UserAction {
    return { type: ActionType.REGISTER, payload: {} };
}



// Step 5 - Reducer function perform the required action
export function userReducer(currentState: UserAppState = new UserAppState(),action:UserAction): UserAppState{


    const newState = {...currentState} //Spread Operator // Copy
    switch(action.type){
        case ActionType.LOGGED_IN: {
            newState.user = action.payload;
            break;
        }
        case ActionType.LOGGED_OUT:{
            newState.user = {email:"",token:"",clientType:""};
            break;
        }
        case ActionType.REGISTER: {

            break;
        }


    }
    return newState;

}