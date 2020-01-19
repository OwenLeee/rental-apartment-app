import React from 'react';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { connect } from 'react-redux';
import { Carousel, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import { FaPlusCircle } from "react-icons/fa";
// import { loadPhotos } from '../redux/photosUpload/thunk';
import { IPhotosPath } from '../redux/photosUpload/state';
import '../scss/PhotosUpload.scss'
import { loadPhotos, createPhotos } from '../redux/photosUpload/thunk';
import ProcedureBar from './ProcedureBar';


interface IPhotosUploadProps {
    photosPath: IPhotosPath[];
    rentalId: number;
    loadPhotos: (apartmentId: number) => void;
    createPhotos: (acceptedFiles: File[], apartmentId: number) => void;
}

class PhotosUpload extends React.Component<IPhotosUploadProps> {
    // constructor(props: IPhotosUploadProps) {
    //     super(props);
    // }

    // componentDidMount() {
    //     this.props.loadPhotos();
    // }

    handleUploadPhotos = () => {
        // this.props.createPhotos(this.props.rentalId);
        // this.props.loadPhotos(this.props.rentalId);
    }

    private onDrop = (acceptedFiles: File[]) => {
        this.props.createPhotos(acceptedFiles, this.props.rentalId);
    }

    public render() {
        console.log(this.props.photosPath);
        return (
            <div className="photos-upload">
                <ProcedureBar procedure="Photos"/>
                <div className="whole-wrap">
                    {
                        this.props.photosPath.length > 0 ?
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="holder.js/800x400?text=First slide&bg=373940"
                                        alt="First slide"
                                    />
                                </Carousel.Item>
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
                <Button variant="primary">Submit
             </Button>
            </div>
        )
    }
}


const mapStateToProps = (state: IRootState) => {
    return {
        photosPath: state.photosUpload.photo_path,
        rentalId: state.listing.rentalId
    }
};

const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => {
    return {
        loadPhotos: (apartmentId: number) => dispatch(loadPhotos(apartmentId)),
        createPhotos: (acceptedFiles: File[], apartmentId: number) => dispatch(createPhotos(acceptedFiles, apartmentId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosUpload);