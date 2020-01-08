//import States & Actions
import { IAuthState } from "./state";
import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, IAuthActions } from "./actions";

//Define value in this component's State
const initialState = {
    isAuthenticated: null, //take the token from local store
    msg: null
};

export function authReducer(
    state: IAuthState = initialState,
    action: IAuthActions
) {
    //Action.type => 3 Actions in IAuthActions which reutrn key(type):value(Login_Sucess, Login_Failed, Logout)
    switch (action.type) { 
        case LOGIN_SUCCESS: 
            return {
                ...state,
                isAuthenticated: true,
                msg: ""
            };
        case LOGIN_FAILED: 
            return {
                ...state,
                isAuthenticated: false,
                msg: action.msg
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                msg: ""
            };
        default:
            return state;
    }
}