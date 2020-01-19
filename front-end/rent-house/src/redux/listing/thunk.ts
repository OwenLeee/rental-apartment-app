import { ReduxThunkDispatch } from "../store";
import { push } from "connected-react-router";
import { getRentalId } from "./actions";


const { REACT_APP_API_SERVER } = process.env;



export function postDetailsOne(typeId: number, area: string, district: string, levelId: number, building: string,
    block: string, latitude: number, longitude: number) {
    return async (dispatch: ReduxThunkDispatch) => {
        let rentalId;

        const res = await fetch(`${REACT_APP_API_SERVER}/listing/details/1`, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${getState().auth.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                typeId, area, district, levelId,
                building, block, latitude, longitude
            })
        });
        rentalId = await res.json();

        dispatch(getRentalId(rentalId));

        dispatch(push('/details/2'));
    }
};


export function postDetailsTwo(rentalApartmentId: number, bedroomsId: number, bathroomsId: number, isStoreroom: string,
    isCarpark: string, isFurniture: string, periodYears: number) {
    return async (dispatch: ReduxThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/listing/details/2`, {
            method: 'PUT',
            headers: {
                // 'Authorization': `Bearer ${getState().auth.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                rentalApartmentId, bedroomsId, bathroomsId,
                isStoreroom, isCarpark, isFurniture, periodYears
            })
        });

        await res.json();
        dispatch(push('/details/3'));
    }
};






