import { CallHistoryMethodAction } from "connected-react-router";

//Set value
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SIGNUP_FAILED = "SIGNUP_FAILED"
export const LOGOUT = "LOGOUT";

// Interface
export type SUCCESS = typeof LOGIN_SUCCESS | typeof SIGNUP_SUCCESS

export type FAILED = typeof LOGIN_FAILED | typeof SIGNUP_FAILED

export type LOGOUT = typeof LOGOUT

interface ISuccess {
  type: SUCCESS,
  msg: string
}

interface IFailed {
  type: FAILED,
  msg: string
};

interface ILogoutSuccess {
  type: LOGOUT;
}

// Action Creator
export function Success(type:SUCCESS, msg: string): ISuccess {
  return {
    type,
    msg
  };
}

export function failed(type: FAILED, msg: string): IFailed {
  return {
    type,
    msg
  };
}
export function logoutSuccess(): ILogoutSuccess {
  console.log("actions")
  return {
    type: LOGOUT
  };
}

//export type
export type IAuthActions = ISuccess | ILogoutSuccess | IFailed |CallHistoryMethodAction;
