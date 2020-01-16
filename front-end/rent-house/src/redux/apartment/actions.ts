import { IApartment, ISearchConditions } from "./state";

export const GET_APARTMENT_ACTION = "@@apartment/GET_APARTMENT_ACTION";
export const SEARCH_APARTMENT_ACTION = "@@apartment/SEARCH_APARTMENT_ACTION";

export function getApartments(apartments: IApartment[]) {
    return {
        type: GET_APARTMENT_ACTION,
        apartments
    }

}

export function searchApartments(conditions: ISearchConditions){

    return {
        type: SEARCH_APARTMENT_ACTION, 
        conditions
    }
}

type apartmentActionsCreator = typeof getApartments;

export type IApartmentActions = ReturnType<apartmentActionsCreator>;