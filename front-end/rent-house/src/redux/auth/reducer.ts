//import States & Actions
import { IAuthState } from "./state";
import { LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_SUCCESS, SIGNUP_FAILED, LOGOUT, IAuthActions } from "./actions";

//Define value in this component's State
const initialState = {
    isAuthenticated: (localStorage.getItem('token') != null),
    msg: "",
    status: ""
};

export function authReducer(
    state: IAuthState = initialState,
    action: IAuthActions
) {
    //Action.type => 3 Actions in IAuthActions which reutrn key(type):value(Login_Sucess, Login_Failed, Logout)
    switch (action.type) {
        case LOGIN_SUCCESS: // when Type:LOGIN_SUCCESS in IAuthActions
            return {
                ...state,
                isAuthenticated: true,
                msg: action.msg,
                status: "success"
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                msg: action.msg,
                status: "success"
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                msg: action.msg,
                status: "failed"
            };
        case SIGNUP_FAILED:
            return {
                ...state,
                msg: action.msg,
                status: "failed"
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                msg: "",
                status: ""
            };
        default:
            return state;
    }
}