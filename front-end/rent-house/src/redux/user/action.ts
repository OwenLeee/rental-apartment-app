import { IUserState } from './state';

// Action Creator
export function getUser(userProfile: IUserState,status:string){
    return {
        type:"GET_USER"as "GET_USER",
        userProfile,
        status:status
    };
}

export function getUserFailure(status:string){
    return {
        type:"GET_USER_FAILURE"as "GET_USER_FAILURE",
        status:status
    };
}


//Action Creator Summary
type UserActionCreators = typeof getUser | 
                          typeof getUserFailure

//export type
export type IUserActions = ReturnType<UserActionCreators>
