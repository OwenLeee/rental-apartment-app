import { IPhotosUploadState } from './state';
import { IPhotosUploadAction } from './actions';

const initialState = {
    photo_path: []
}

export const photosUploadReducers = (state: IPhotosUploadState = initialState, action: IPhotosUploadAction) => {
    switch (action.type) {
        // case "GET_PHOTOS":
        //     return {
        //         ...state,
        //         photos: action.photos
        //     }
        case "ADD_PHOTOS":
            return {
                ...state,
                photo_path: action.photo_path
            }
        // case "REMOVE_PHOTOS":
        //     return {
        //         ...state,
        //         photo_path: action.photo_path
        //     }
        default:
            return state
    }
};
