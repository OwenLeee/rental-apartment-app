import { ReduxThunkDispatch } from "../store";
import { addVideo } from './actions';


const { REACT_APP_API_SERVER } = process.env;


export function createVideo(apartmentId: number, videoPath: string) {
    return async (dispatch: ReduxThunkDispatch) => {
        if (apartmentId === 0) {
            let rentalId = localStorage.getItem('rentalId');
            if (rentalId != null) {
                apartmentId = parseInt(rentalId);
            }
        }

        const res = await fetch(`${REACT_APP_API_SERVER}/listing/video/`, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${getState().auth.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                apartmentId, videoPath
            })
        });
        const result = await res.json();
        // console.log('i am result!!!', result);

        if (result.result === true) {
            dispatch(addVideo(result.videoPath));
        }
    }
};