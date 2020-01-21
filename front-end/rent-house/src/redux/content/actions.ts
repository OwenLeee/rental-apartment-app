import { IApartment } from "./state";



export function getApartment(apartment: IApartment[]) {
    return {
        type: "GET_APARTMENT" as "GET_APARTMENT",
        apartment
    }
};

export function getPhotos(photos: {photo_path: string}[]) {
    return {
        type: "GET_PHOTOS" as "GET_PHOTOS",
        photos
    }
};

export function getPlanner(planner: string[]) {
    return {
        type: "GET_PLANNER" as "GET_PLANNER",
        planner
    }
};


type ContentActionCreators = typeof getApartment
                            | typeof getPhotos
                            | typeof getPlanner


export type IContentActions = ReturnType<ContentActionCreators>