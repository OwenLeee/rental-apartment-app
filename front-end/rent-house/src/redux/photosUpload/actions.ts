import { IPhotosUploadState } from './state';

export function addPhotos(photos: IPhotosUploadState) {
    return {
        type: "ADD_PHOTOS" as "ADD_PHOTOS",
        photos
    }
};

export function removePhotos(photos: IPhotosUploadState) {
    return {
        type: "REMOVE_PHOTOS" as "REMOVE_PHOTOS",
        photos
    }
};



type PhotosUploadActionCreators = typeof addPhotos |
                                    typeof removePhotos

export type IPhotosUploadAction = ReturnType<PhotosUploadActionCreators>