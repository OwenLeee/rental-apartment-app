

// export function getPhotos(photos: string[]) {
//     return {
//         type: "GET_PHOTOS" as "GET_PHOTOS",
//         photos
//     }
// };

export function addPhotos(photo_path: string[]) {
    return {
        type: "ADD_PHOTOS" as "ADD_PHOTOS",
        photo_path
    }
};

// export function removePhotos(photo_path: string[]) {
//     return {
//         type: "REMOVE_PHOTOS" as "REMOVE_PHOTOS",
//         photo_path
//     }
// };



type PhotosUploadActionCreators = typeof addPhotos 
                                //   typeof removePhotos
                                //   typeof getPhotos 

export type IPhotosUploadAction = ReturnType<PhotosUploadActionCreators>