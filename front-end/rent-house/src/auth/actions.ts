import { CallHistoryMethodAction } from "connected-react-router";

//Set value
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAILED = "LOGIN_FAILED";

// Interface
interface ILoginSuccess {
  type: typeof LOGIN_SUCCESS;
}

interface ILogoutSuccess {
  type: typeof LOGOUT;
}

export type FAILED = typeof LOGIN_FAILED;

interface IFailed {
  type: FAILED;
  msg: string | null;
};

// Action Creator
export function loginSuccess(): ILoginSuccess {
  return {
    type: LOGIN_SUCCESS
  };
}

export function logoutSuccess(): ILogoutSuccess {
  return {
    type: LOGOUT
  };
}

export function failed(type: FAILED, msg: string | null): IFailed {
  return {
    type,
    msg
  };
}

//export type
export type IAuthActions = ILoginSuccess | ILogoutSuccess | IFailed | CallHistoryMethodAction;