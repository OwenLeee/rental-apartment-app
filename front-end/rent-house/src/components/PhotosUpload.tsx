import React from 'react';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { connect } from 'react-redux';
import { Carousel, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import { FaPlusCircle } from "react-icons/fa";
// import { loadPhotos } from '../redux/photosUpload/thunk';
import '../scss/PhotosUpload.scss'
import { createPhotos } from '../redux/photosUpload/thunk';
import ProcedureBar from './ProcedureBar';
import { push } from 'connected-react-router';


interface IPhotosUploadProps {
    photo_path: string[];
    rentalId: number;
    // loadPhotos: (apartmentId: number) => void;
    createPhotos: (acceptedFiles: File[], apartmentId: number) => void;
    redirectToVideo: () => void;

}

class PhotosUpload extends React.Component<IPhotosUploadProps> {
    // constructor(props: IPhotosUploadProps) {
    //     super(props);
    // }

    // componentDidMount() {
    //     this.props.loadPhotos();
    // }

    private onDrop = (acceptedFiles: File[]) => {
        this.props.createPhotos(acceptedFiles, this.props.rentalId);
    }

    public render() {
        // console.log('i am props in component!', this.props.photo_path);
        return (
            <div className="photos-upload">
                <ProcedureBar procedure="Photos" />
                <div className="whole-wrap">
                    {
                        this.props.photo_path.length > 0 ?

                            <Carousel className="carousel-wrap">
                                {this.props.photo_path.map(photo => {
                                    return (
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={photo}
                                                alt="First slide"
                                            />
                                        </Carousel.Item>
                                    )
                                })
                                }
                            </Carousel>

                            :
                            <div className="drop-zone-wrap">
                                <Dropzone onDrop={this.onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section className="upload-wrap">
                                            <div className="upload-box" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <FaPlusCircle style={{ color: "grey" }} size={60} />
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                    }

                </div>
                <Button variant="primary" onClick={this.props.redirectToVideo}>Submit</Button>
            </div>
        )
    }
}


const mapStateToProps = (state: IRootState) => {
    return {
        photo_path: state.photosUpload.photo_path,
        rentalId: state.listing.rentalId
    }
};

const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => {
    return {
        // loadPhotos: (apartmentId: number) => dispatch(loadPhotos(apartmentId)),
        createPhotos: (acceptedFiles: File[], apartmentId: number) => dispatch(createPhotos(acceptedFiles, apartmentId)),
        redirectToVideo: () => dispatch(push('/post/video'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosUpload);