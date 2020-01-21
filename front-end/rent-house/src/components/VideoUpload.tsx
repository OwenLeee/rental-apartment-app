import React from 'react';
import ProcedureBar from './ProcedureBar';
import ReactPlayer from 'react-player';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createVideo } from '../redux/videoUpload/thunk';
import { IRootState } from '../redux/store';
import { push } from 'connected-react-router';
import { Button } from 'react-bootstrap';
import '../scss/PhotosUpload.scss'


const VideoUpload: React.FC = () => {




    const rentalId = useSelector((state: IRootState) => state.listing.rentalId);
    const video_path = useSelector((state: IRootState) => state.videoUpload.video_path);
    console.log(video_path);

    const dispatch = useDispatch();


    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        dispatch(createVideo(rentalId, data.youTubeLink));
    }

    return (
        <div className="photos-upload">
            <ProcedureBar procedure="Video" />
            <div className="whole-wrap">

                {video_path === '' ?
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="url" placeholder="Youtube Link" name="youTubeLink" ref={register} />
                        <input type="submit" />
                    </form>
                    :
                    <div className="player-wrapper">
                           <ReactPlayer className="react-player" url={video_path} playing={false} controls={true} width="100%" height="100%"/>
                    </div>                    
                 
                }
            </div>

            <Button variant="primary" onClick={() => dispatch(push('/post/planner'))}>Submit</Button>

        </div>
    )
}

export default VideoUpload;