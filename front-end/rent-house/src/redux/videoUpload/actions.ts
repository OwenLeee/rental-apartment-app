export function addVideo(video_path: string) {
    return {
        type: "ADD_VIDEO" as "ADD_VIDEO",
        video_path
    }
};

type VideoUploadActionCreators = typeof addVideo;


export type IVideoUploadAction = ReturnType<VideoUploadActionCreators>;
