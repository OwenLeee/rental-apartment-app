import { ReduxThunkDispatch } from "../store";
import { getUser, getUserFailure } from "./action";
import * as dotenv from 'dotenv';

dotenv.config();
const { REACT_APP_API_SERVER } = process.env;

//get User Info
export function getUserInfoThunk(email: string) {
    return async (dispatch: ReduxThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/users/profile/` + email);
        const result = await res.json();
        console.log(result)
        // eslint-disable-next-line
        if (res.status == 200) {
            dispatch(getUser(result, result.msg));
        } else {
            dispatch(getUserFailure(result.msg));        
        }
    }
}