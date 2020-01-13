import { IApartmentState } from "./state";

export const GET_APARTMENT_ACTION = "@@apartment/GET_APARTMENT_ACTION";

// export interface GetApartmentAction {
//     type: typeof GET_APARTMENT_ACTION; 
//     searchKeywords: string; 
//     propertyType: string; 
//     lowestPrice: number; 
//     highestPrice: number; 
//     bedrooms: string; 
//     bathrooms: string; 
//     isParking: boolean; 
//     isFurniture: boolean; 
// }



export function getApartment() {
    return {
        type: GET_APARTMENT_ACTION,
    }

}

type apartmentActionsCreator = typeof getApartment;

export type IApartmentActions = ReturnType<apartmentActionsCreator>;