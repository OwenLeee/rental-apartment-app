import { CallHistoryMethodAction } from "connected-react-router";

//Set value
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAILED = "LOGIN_FAILED";
// export const LOGINPAGE = "LOGIN_PAGE"
// export const REGISTERPAGE = "REGISTER_PAGE"

// Interface
interface ILoginSuccess {
  type: typeof LOGIN_SUCCESS;
}

interface ILogoutSuccess {
  type: typeof LOGOUT;
}

export type FAILED = typeof LOGIN_FAILED;

interface IFailed {
  type: FAILED,
  msg: string
};

// interface ISwitchLogin {
//   type: typeof LOGINPAGE
// }

// interface ISwitchRegister {
//   type: typeof REGISTERPAGE
// }

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

export function failed(type: FAILED, msg: string): IFailed {
  return {
    type,
    msg
  };
}

// export function switchLogin(): ISwitchLogin {
//   return {
//     type: LOGINPAGE
//   };
// }

// export function switchRegister(): ISwitchRegister {
//   return {
//     type: REGISTERPAGE
//   };
// }
//export type
export type IAuthActions = ILoginSuccess | ILogoutSuccess | IFailed |CallHistoryMethodAction;
// export type ISwitchActions =  ISwitchLogin | ISwitchRegister |CallHistoryMethodAction;