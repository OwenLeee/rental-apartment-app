import { IApartment } from "./state";

export const GET_APARTMENT_ACTION = "@@apartment/GET_APARTMENT_ACTION";

export function getApartments(apartments: IApartment[]) {
    return {
        type: GET_APARTMENT_ACTION,
        apartments
    }

}

type apartmentActionsCreator = typeof getApartments;

export type IApartmentActions = ReturnType<apartmentActionsCreator>;