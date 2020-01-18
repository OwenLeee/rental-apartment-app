import { Dispatch } from "redux";
import { IAuthActions, failed, Success, logoutSuccess } from "./actions";
import { push } from "connected-react-router";
import * as dotenv from 'dotenv';

dotenv.config();
const { REACT_APP_API_SERVER } = process.env;

//Login Function
export function loginThunk(email: string, password: string) {
    return async (dispatch: Dispatch<IAuthActions>) => {
        console.log(email, password);
        const res = await fetch(`${REACT_APP_API_SERVER}/users/login`,
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
            console.log("failed")
        } else {
            localStorage.setItem("token", result.token);
            dispatch(Success("LOGIN_SUCCESS",  result.msg));
            dispatch(push("/"));
        }
    }
}

//loginFacebook Function
export function loginFacebookThunk(accessToken: string) {
    return async (dispatch: Dispatch<IAuthActions>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/users/login/facebook`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ accessToken })
        })
        const result = await res.json();

        if (res.status !== 200) {
            dispatch(failed("LOGIN_FAILED", result.msg));
        } else {
            localStorage.setItem('token', result.token);
            dispatch(Success("LOGIN_SUCCESS", result.msg))
            dispatch(push("/"));
        }
    }
}

//Register Function
export function signupThunk(email: string, password: string) {
    return async (dispatch: Dispatch<IAuthActions>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/users/signup`,
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
            dispatch(failed("SIGNUP_FAILED", result.msg));
        } else {
            dispatch(Success("SIGNUP_SUCCESS", result.msg));
            //login
            localStorage.setItem("token", result.token);
            dispatch(Success("LOGIN_SUCCESS", result.msg));
            dispatch(push("/"));
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
            dispatch(failed("LOGIN_FAILED", "Token not found"));
            dispatch(push("/login"));
            return;
        }

        const res = await fetch(`   /private`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        if (res.status !== 200) {
            dispatch(failed("LOGIN_FAILED", "internal Error"));
        } else {
            console.log("success");
            dispatch(Success("LOGIN_SUCCESS", "Restore Login Success"));
            dispatch(push("/"));
        }
    }
}