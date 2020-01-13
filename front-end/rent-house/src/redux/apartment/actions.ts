import { IApartment } from "./state";

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



export function getApartments(apartments: IApartment[]) {
    return {
        type: GET_APARTMENT_ACTION,
        apartments
    }

}

type apartmentActionsCreator = typeof getApartments;

export type IApartmentActions = ReturnType<apartmentActionsCreator>;