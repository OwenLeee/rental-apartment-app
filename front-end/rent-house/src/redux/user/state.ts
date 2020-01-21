export interface IUserInfo{
    icon: string,
    name: string
}

export interface IUserState {
    email: string,
    userinfo: IUserInfo
    status: string
}