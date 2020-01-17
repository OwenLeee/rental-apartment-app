import { IPhotosUploadState } from './state';
import { IPhotosUploadAction } from './actions';

const initialState = {
    photosPath: []
}

export const photosUploadReducers = (state: IPhotosUploadState = initialState, action: IPhotosUploadAction) => {
    switch (action.type) {
        case "ADD_PHOTOS":
            return {
                ...state,
                photos: action.photos
            }
        case "REMOVE_PHOTOS":
            return {
                ...state,
                photos: action.photos
            }
        default:
            return state
    }
};
