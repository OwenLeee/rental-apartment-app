import { ReduxThunkDispatch } from "../store";
import { getPhotos/*, addPhotos, removePhotos*/ } from './actions';


const { REACT_APP_API_SERVER } = process.env;

export function loadPhotos(apartmentId: number) {
    return async (dispatch: ReduxThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/apartmentDetails/apartmentPhotos/` + apartmentId);
        const result = await res.json();
        // console.log(result);
        dispatch(getPhotos(result));
    }
}


export function createPhotos(acceptedFiles: File[], apartmentId: number) {
    return async (dispatch: ReduxThunkDispatch) => {

        const formData = new FormData();
        for (const acceptedFile in acceptedFiles) {
            formData.append("building", acceptedFile)
        }
        formData.append("apartmentId", apartmentId + "")

        const res = await fetch(`${REACT_APP_API_SERVER}/listing/photos/`, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${getState().auth.token}`,
                // "Content-Type": "application/json; charset=utf-8"
            },
            body: formData
        });
        const result = await res.json();
        if (result.result === true) {
            dispatch(loadPhotos(apartmentId));
        }
    }
}
