import React from 'react';
import { IRootState } from '../redux/store';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import '../scss/PhotosUpload.scss'
import { FaPlusCircle } from "react-icons/fa";


interface IPhotosUploadProps {
    photosPath: []
}

class PhotosUpload extends React.Component<IPhotosUploadProps> {
    constructor(props: IPhotosUploadProps) {
        super(props);
    }


    public render() {
        return (
            <div>
                {
                    this.props.photosPath ?
                    
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
                        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section className="upload-wrap">
                                    <div className="upload-box" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <FaPlusCircle style={{ color: "grey" }} size={6} />
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                }
            </div>
        )
    }

}



const mapStateToProps = (state: IRootState) => {
    return {
        photosPath: state.photosUpload.photosPath
    }
}


export default connect(mapStateToProps, null)(PhotosUpload);