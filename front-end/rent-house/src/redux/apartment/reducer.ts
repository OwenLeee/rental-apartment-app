import { IApartmentState } from "./state";
import { IApartmentActions, GET_APARTMENT_ACTION } from "./actions";



const initialState = {
    apartments: [],
}

export function apartmentReducer(state: IApartmentState = initialState, action: IApartmentActions) {

    switch (action.type) {
        case GET_APARTMENT_ACTION:
            return {
                ...state,
                apartments: action.apartments
            }
        default:
            return state;
    }
}