import { ReduxThunkDispatch } from "../store";
import { getPhotos, addPhotos, removePhotos } from './actions';


const { REACT_APP_API_SERVER } = process.env;

export function loadPhotos(apartmentId: string) {
    return async (dispatch: ReduxThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/apartmentDetails/apartmentPhotos/` + apartmentId);
        const result = await res.json();
        // console.log(result);
        dispatch(getPhotos(result));
    }
}


// export function createPhotos() {
//     return async (dispatch: ReduxThunkDispatch) => {

//     }
// }
