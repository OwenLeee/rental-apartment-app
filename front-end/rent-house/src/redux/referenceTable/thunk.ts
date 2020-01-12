import { ReduxThunkDispatch } from "../store";
import { getApartmentType, getAreaDistrict, getBedrooms, getBathrooms, getFloorLevel } from './action';


const { REACT_APP_API_SERVER } = process.env;

export function getTypes() {
    return async (dispatch: ReduxThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/reference/apartmentType`);
        const result = await res.json();

        dispatch(getApartmentType(result));
    }
};

export function getDistrict() {
    return async (dispatch: ReduxThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/reference/areaDistrict`);
        const result = await res.json();

        dispatch(getAreaDistrict(result));
    }
};



