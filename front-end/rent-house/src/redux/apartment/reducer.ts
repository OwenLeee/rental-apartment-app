import { IApartmentState } from "./state";
import IApartmentActions, { GET_APARTMENT_ACTION, SEARCH_APARTMENT_ACTION } from "./actions";

const initialState = {
    apartments: [],
    searchConditions: {
        keywords: "",
        propertyType: "",
        minPrice: 0,
        maxPrice: 0,
        bedrooms: "",
        bathrooms: "",
        isStoreroom: 3,
        isFurniture: 3
    }
}

export function apartmentReducer(state: IApartmentState = initialState, actions: IApartmentActions) {
    switch (actions.type) {
        case GET_APARTMENT_ACTION:
            return {
                ...state,
                apartments: actions.apartments
            }
        case SEARCH_APARTMENT_ACTION:
            return {
                ...state,
                searchConditions: Object.assign({}, state.searchConditions, actions.conditions)
            }
        default:
            return state;
    }
}
