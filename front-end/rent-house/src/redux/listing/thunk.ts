import { ReduxThunkDispatch } from "../store";
import { push } from "connected-react-router";
import { getRentalId } from "./actions";


const { REACT_APP_API_SERVER } = process.env;



export function postDetailsOne(typeId: number, area: string, district: string, levelId: number, building: string,
    block: string, latitude: number, longitude: number) {
    return async (dispatch: ReduxThunkDispatch) => {

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
        const rentalId = await res.json();

        dispatch(getRentalId(rentalId));
        dispatch(push('/post/details/2'));
    }
};


export function postDetailsTwo(rentalApartmentId: number, bedroomsId: number, bathroomsId: number, isStoreroom: boolean,
    isCarpark: boolean, isFurniture: boolean, periodYears: number) {
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
        dispatch(push('/post/details/3'));
    }
};

export function postDetailsThree(rentalApartmentId: number, saleArea: number, grossArea: number, price: number,
    deposit: number, title: string, description: string) {
    return async (dispatch: ReduxThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/listing/details/3`, {
            method: 'PUT',
            headers: {
                // 'Authorization': `Bearer ${getState().auth.token}`,
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                rentalApartmentId, saleArea, grossArea, price,
                deposit, title, description
            })
        });

        await res.json();
        dispatch(push('/post/photos'));
    }
};





