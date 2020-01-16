import { IApartmentState } from "./state";
import { IApartmentActions, GET_APARTMENT_ACTION, SEARCH_APARTMENT_ACTION } from "./actions";

const initialState = {
    apartments: [],
    searchConditions: {
        keywords: "",
        propertyType: "",
        minPrice: 0,
        maxPrice: 0,
        bedrooms: "",
        bathrooms: "",
        isStoreroom: true,
        isFurniture: true
    }
}

export function apartmentReducer(state: IApartmentState = initialState, action: IApartmentActions) {

    switch (action.type) {
        case GET_APARTMENT_ACTION:
            return {
                ...state,
                apartments: action.apartments
            }
        case SEARCH_APARTMENT_ACTION:
            return {
                ...state,
                apartments: action.apartments
            }
        default:
            return state;
    }



}


