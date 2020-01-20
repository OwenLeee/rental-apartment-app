import { IApartmentState } from "./state";
import IApartmentActions, { GET_APARTMENT_ACTION, SEARCH_APARTMENT_ACTION, SEARCH_HOTSPOT_ACTION } from "./actions";

const initialState = {
    apartments: [],
    searchConditions: {
        keywords: "",
        propertyType: "",
        area: "",
        minPrice: 0,
        maxPrice: 0,
        bedrooms: "",
        bathrooms: "",
        isStoreroom: 4,
        isFurniture: 4
    }, 
    location: {
        lat: 0, 
        lng: 0
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
        case SEARCH_HOTSPOT_ACTION:
            return {
                ...state, 
                location: Object.assign({}, state.location, actions.location)
            }
        default:
            return state;
    }
}
