import { ReduxThunkDispatch } from "../store";
import { push } from "connected-react-router";

const { REACT_APP_API_SERVER } = process.env;

export function postFloorPlan(apartmentId: number, floorPlanJson: string) {
    if (apartmentId === 0) {
        let rentalId = localStorage.getItem('rentalId');
        if (rentalId != null) {
            apartmentId = parseInt(rentalId)
        }
    }
    return async (dispatch: ReduxThunkDispatch) => {


        const res = await fetch(`${REACT_APP_API_SERVER}/listing/floorPlan`, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${getState().auth.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                apartmentId,
                floorPlanJson
            })
        });
        const result = await res.json();

        if (result.result === true) {
            localStorage.removeItem('rentalId');
            alert("Listing completed!")
            dispatch(push('/rent'));
        }
    }
};
