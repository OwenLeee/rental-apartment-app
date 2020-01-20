import { IApartment, ISearchConditions, IHotSpotLatLng } from "./state";

export const GET_APARTMENT_ACTION = "@@apartment/GET_APARTMENT_ACTION";
export const SEARCH_APARTMENT_ACTION = "@@apartment/SEARCH_APARTMENT_ACTION";
export const SEARCH_HOTSPOT_ACTION = "@@apartment/SEARCH_HOTSPOT_ACTION";

export function getApartments(apartments: IApartment[]) {
    return {
        type: GET_APARTMENT_ACTION as typeof GET_APARTMENT_ACTION,
        apartments
    }

}

export function searchApartments(conditions: ISearchConditions){

    return {
        type: SEARCH_APARTMENT_ACTION as typeof SEARCH_APARTMENT_ACTION,
        conditions
    }
}

export function searchHotSpotPlace(location: IHotSpotLatLng) {

    return {
        type: SEARCH_HOTSPOT_ACTION as typeof SEARCH_HOTSPOT_ACTION, 
        location
    }
}

type ApartmentActionsCreators = typeof getApartments |
                                typeof searchApartments |
                                typeof searchHotSpotPlace; 

 type IApartmentActions = ReturnType<ApartmentActionsCreators>;

 export default IApartmentActions
