

export function getRentalId(rentalId: number) {
    return {
        type: "GET_RENTAL_ID" as "GET_RENTAL_ID",
        rentalId
    }
};

type ListingActionCreators = typeof getRentalId;

export type IListingActions = ReturnType<ListingActionCreators>
