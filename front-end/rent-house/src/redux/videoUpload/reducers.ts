import { IVideoUploadState } from './state';
import { IVideoUploadAction } from './actions';

const initialState = {
    video_path: ''
}

export const videoUploadReducers = (state: IVideoUploadState = initialState, action: IVideoUploadAction) => {
    switch (action.type) {
        case "ADD_VIDEO":
            return {
                ...state,
                video_path: action.video_path
            }
        default:
            return state
    }
};
