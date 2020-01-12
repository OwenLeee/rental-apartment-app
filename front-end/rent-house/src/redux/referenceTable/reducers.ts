import { IReferenceTableState } from './state';
import { IReferenceTableActions } from './action';

const initialState = {
    apartmentType: [],
    areaDistrict: [],
    bedrooms: [],
    bathrooms: [],
    floorLevel: []
}

export const referenceTableReducers = (state: IReferenceTableState = initialState, action: IReferenceTableActions) => {
    switch (action.type) {
        case "GET_APARTMENT_TYPE":
            return {
                ...state,
                apartmentType: action.apartmentType
            }
        case "GET_AREA_DISTRICT":
            return {
                ...state,
                areaDistrict: action.areaDistrict
            }
        case "GET_BEDROOMS":
            return {
                ...state,
                bedrooms: action.bedrooms
            }
        case "GET_BATHROOMS":
            return {
                ...state,
                bathrooms: action.bathrooms
            }
        case "GET_FLOOR_LEVEL":
            return {
                ...state,
                floorLevel: action.floorLevel
            }
        default:
            return state
    }
};