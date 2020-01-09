import { Dispatch } from "redux";
import { IAuthActions, failed, loginSuccess, logoutSuccess } from "./actions";
import { push } from "connected-react-router";

const { REACT_APP_API_SERVER } = process.env;

export function restoreLoginThunk() {
    return async (dispatch: Dispatch<IAuthActions>) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(failed("LOGIN_FAILED", null));
            dispatch(push("/login"));
            return;
        }

        const res = await fetch(`${REACT_APP_API_SERVER}/greeting`, {
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

export function loginThunk(email: string, password: string) {
    return async (dispatch: Dispatch<IAuthActions>) => {
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
        } else {
            localStorage.setItem("token", result.token);
            dispatch(loginSuccess());
            dispatch(push("/"));
        }
    }
}

export function logout() {
    return async (dispatch: Dispatch<IAuthActions>) => {
        dispatch(logoutSuccess());
        localStorage.removeItem("token");
        dispatch(push("/"));
    };
}
