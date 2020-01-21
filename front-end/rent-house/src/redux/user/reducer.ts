//import States & Actions
import { IUserState } from "./state";
import { IUserActions } from "./action";

//Define value in this component's State
const initialState = {
    email: "",
    userinfo: {
        icon: "",
        name: ""
    },
    status: ""
};

export function userReducer(
    state: IUserState = initialState,
    action: IUserActions
) {
    //Action.type => 3 Actions in IAuthActions which reutrn key(type):value(Login_Sucess, Login_Failed, Logout)
    switch (action.type) {
        case "GET_USER": // when Type:LOGIN_SUCCESS in IAuthActions
            return {
                ...state,
                email: action.userProfile.email,
                userinfo: {
                    profile: action.userProfile.userinfo.icon,
                    name: action.userProfile.userinfo.name
                },
                status: "User was found"
            };
        case "GET_USER_FAILURE":
            return {
                ...state,
                email: "",
                userinfo: {
                    profile: "",
                    name: ""
                },
                status: "User not found"
            };
        default:
            return state;
    }
}