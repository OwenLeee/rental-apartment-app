import { Dispatch } from "redux";
import { IAuthActions, failed, loginSuccess, logoutSuccess } from "./actions";
import { push } from "connected-react-router";

//Login Function
export function loginThunk(email: string, password: string) {
    return async (dispatch: Dispatch<IAuthActions>) => {
        const res = await fetch(`/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
        )
        const result = await res.json();

        if (res.status !== 200) {
            dispatch(failed("LOGIN_FAILED", result.msg));
        } else {
            localStorage.setItem("token", result.token);
            dispatch(loginSuccess());
            dispatch(push("/"));
        }
    }
}

//loginFacebook Function
export function loginFacebookThunk(accessToken:string){
    return async(dispatch:Dispatch<IAuthActions>)=>{
        const res = await fetch(`/users/login/facebook`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify({ accessToken})
        })
        const result = await res.json();

        if(res.status!==200){
            dispatch(failed("LOGIN_FAILED",result.msg));
        }else{
            localStorage.setItem('token',result.token);
            dispatch(loginSuccess())
            dispatch(push("/"));
        }
    }
}

//Register Function
export function RegisterThunk(email: string, password: string) {
    return async (dispatch: Dispatch<IAuthActions>) => {
        const res = await fetch(`/users/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
        )
        const result = await res.json();
        if (res.status !== 200) {
            dispatch(failed("REGISTER_FAILED", result.msg));
        } else {
            loginThunk(email, password)
        }
    }
}

// Logout Function
export function logout() {
    return async (dispatch: Dispatch<IAuthActions>) => {
        dispatch(logoutSuccess());
        localStorage.removeItem("token");
        dispatch(push("/"));
    };
}

// Redirect to Login
export function restoreLoginThunk() {
    return async (dispatch: Dispatch<IAuthActions>) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(failed("LOGIN_FAILED", null));
            dispatch(push("/login"));
            return;
        }

        const res = await fetch(`/private`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        if (res.status !== 200) {
            dispatch(failed("LOGIN_FAILED", null));
        } else {
            console.log("success");
            dispatch(loginSuccess());
            dispatch(push("/"));
        }
    }
}