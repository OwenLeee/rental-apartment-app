import { IListingState } from './state';

export function getRentalId(getRentalId: IListingState) {
    return {
        type: "GET_RENTAL_ID" as "GET_RENTAL_ID",
        getRentalId
    }
};

type ListingActionCreators = typeof getRentalId;

export type IListingActions = ReturnType<ListingActionCreators>
