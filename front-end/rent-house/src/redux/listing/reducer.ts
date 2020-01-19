import { IListingState } from './state';
import { IListingActions } from './actions';

const initialState = {
    rentalId: 0
}

export const listingReducers = (state: IListingState = initialState, action: IListingActions) => {
    switch (action.type) {
        case "GET_RENTAL_ID":
            return {
                ...state,
                rentalId: action.rentalId
            }
        default:
            return state
    }
}