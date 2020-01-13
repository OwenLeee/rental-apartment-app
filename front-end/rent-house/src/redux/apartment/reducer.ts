<<<<<<< HEAD
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
=======
export const a = 'b'
>>>>>>> 9e77ccd8508e7032d5b5f613fdbf17871989aab6
