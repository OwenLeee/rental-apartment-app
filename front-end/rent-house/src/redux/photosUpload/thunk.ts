import { ReduxThunkDispatch } from "../store";
import { addPhotos/*, removePhotos*/ } from './actions';


const { REACT_APP_API_SERVER } = process.env;

// export function loadPhotos(apartmentId: number) {
//     return async (dispatch: ReduxThunkDispatch) => {
//         const res = await fetch(`${REACT_APP_API_SERVER}/apartmentDetails/apartmentPhotos/` + apartmentId);
//         const result = await res.json();
//         // console.log(result);
//         dispatch(getPhotos(result));
//     }
// }


export function createPhotos(acceptedFiles: File[], apartmentId: number) {
    return async (dispatch: ReduxThunkDispatch) => {
        if (apartmentId === 0) {
            let rentalId = localStorage.getItem('rentalId');
            if (rentalId != null) {
                apartmentId = parseInt(rentalId);
            }
        }
        // console.log('i am acceptedFiles!', acceptedFiles);
        const formData = new FormData();
        for (const acceptedFile of acceptedFiles) {
            // console.log('i am acceptedFiles!',acceptedFile);
            formData.append("building", acceptedFile)
        }
        formData.append("apartmentId", apartmentId + "")

        const res = await fetch(`${REACT_APP_API_SERVER}/listing/photos/`, {
            method: 'POST',
            body: formData
        });
        const result = await res.json();
        // console.log('i am result!!!', result);

        if (result.result === true) {
            dispatch(addPhotos(result.locations));
        }
    }
};
