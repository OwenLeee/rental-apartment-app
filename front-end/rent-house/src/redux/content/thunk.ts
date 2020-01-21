import { ReduxThunkDispatch } from "../store";
import { getApartment, getPhotos, getPlanner } from './actions';

const { REACT_APP_API_SERVER } = process.env;

export function getAllData(apartmentId: number) {
    return async (dispatch: ReduxThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/apartmentDetails/apartment/` + apartmentId);
        const result = await res.json();
        dispatch(getApartment(result));
    }
};

export function getImages(apartmentId: number) {
    return async (dispatch: ReduxThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/apartmentDetails/apartmentPhotos/` + apartmentId);
        const result = await res.json();
        dispatch(getPhotos(result));
    }
};

export function getFloorPlan(apartmentId: number) {
    return async (dispatch: ReduxThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/listing/floorPlan/` + apartmentId);
        const result = await res.json();
        let json = result[0];
        for (let key in json) {
            let jsonOnly = JSON.stringify(json[key]);
            localStorage.setItem('react-planner_v0', jsonOnly);
        }
        dispatch(getPlanner(result));
    }
};