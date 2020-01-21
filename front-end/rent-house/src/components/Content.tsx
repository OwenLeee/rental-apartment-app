import React from 'react';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAllData, getImages, getFloorPlan } from '../redux/content/thunk';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import PlannerReadOnly from './PlannerReadOnly';
import { IApartment } from '../redux/content/state';
import Marker from './FormMapMarker';
import '../scss/Content.scss';
import GoogleMapReact from 'google-map-react';

interface IContentProps {
    apartmentId: {
        params: {
            id: string
        }
    }
    apartment: IApartment[],
    photos: { photo_path: string }[],
    planner: string[],
    getAllData: (apartmentId: number) => void,
    getImages: (apartmentId: number) => void,
    getFloorPlan: (apartmentId: number) => void
}



class Content extends React.Component<IContentProps> {

    componentWillMount() {
        (async () => {
            const { REACT_APP_API_SERVER } = process.env;
            const res = await fetch(`${REACT_APP_API_SERVER}/listing/floorPlan/` + this.props.apartmentId.params.id);
            const result = await res.json();
            let json = result[0];
            for (let key in json) {
                let jsonOnly = json[key];
                localStorage.removeItem('react-planner_v0');
                localStorage.setItem('react-planner_v0', jsonOnly);
                // console.log(localStorage.getItem('react-planner_v0'));
            }
        })();
    };

    componentDidMount() {
        this.props.getAllData(parseInt(this.props.apartmentId.params.id));
        this.props.getImages(parseInt(this.props.apartmentId.params.id));
    }


    public render() {

        const rentalPrice = this.props.apartment.map(data => data.rental_price);
        const address_building = this.props.apartment.map(data => data.address_building);
        const address_block = this.props.apartment.map(data => data.address_block);
        const district = this.props.apartment.map(data => data.district);
        const area = this.props.apartment.map(data => data.area);
        const gross_floor_area = this.props.apartment.map(data => data.gross_floor_area);
        const saleable_area = this.props.apartment.map(data => data.saleable_area);
        const level = this.props.apartment.map(data => data.level);
        const lat = this.props.apartment.map(data => data.lat);
        const lng = this.props.apartment.map(data => data.lng);
        const bathrooms = this.props.apartment.map(data => data.bathrooms);
        const bedrooms = this.props.apartment.map(data => data.bedrooms);
        const is_carpark = this.props.apartment.map(data => data.is_carpark);
        const is_furniture = this.props.apartment.map(data => data.is_furniture);
        const is_storeroom = this.props.apartment.map(data => data.is_storeroom);
        const name = this.props.apartment.map(data => data.name);
        const mobile_number = this.props.apartment.map(data => data.mobile_number);
        const apartment_title = this.props.apartment.map(data => data.apartment_title);
        const apartment_description = this.props.apartment.map(data => data.apartment_description);


        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="whole-wrap">
                            <Carousel className="carousel-wrap">
                                {this.props.photos.map(photo => {
                                    return (
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={photo.photo_path}
                                                alt="First slide"
                                            />
                                        </Carousel.Item>
                                    )
                                })
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>



                <div className="planner-wrap">
                    <PlannerReadOnly />
                </div>



                <div className="row">
                    <div className="col">
                        <div className="top-left-info-wrap">
                            <div>{rentalPrice}</div>
                            <div>{address_building}</div>
                            <div>{address_block}</div>
                            <div>{district}</div>
                            <div>{area}</div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col">
                        <div className="top-right-info-wrap">
                            <div>{gross_floor_area}</div>
                            <div>{saleable_area}</div>
                            <div>{level}</div>
                            <div>{bathrooms}</div>
                            <div>{bedrooms}</div>
                            <div>{is_carpark}</div>
                            <div>{is_furniture}</div>
                            <div>{is_storeroom}</div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col">
                        <div className="right-info-wrap" style={{ height: '50vh', width: '35%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY as string }}
                                defaultCenter={{ lat: lat[0], lng: lng[0] }}
                                center={{ lat: lat[0], lng: lng[0] }}
                                defaultZoom={10}
                                resetBoundsOnResize={true}
                            >
                                <Marker
                                    lat={lat[0]}
                                    lng={lng[0]}
                                    text="My Marker"
                                />
                            </GoogleMapReact>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col">
                        <div className="bottom-left-info-wrap">
                            <div>{apartment_title}</div>
                            <div>{apartment_description}</div>
                        </div>
                    </div>
                </div>




                <div className="row">
                    <div className="col">
                        <div className="bottom-right-info-wrap">
                            <div>{name}</div>
                            <div>{mobile_number}</div>
                        </div>
                    </div>
                </div>





                {/* <div>
                    {this.props.apartment[0].address_building}
                </div>

                <div>
                    {this.propsd.apartment[0].address_block}
                </div>
            
                <div>
                    {this.props.apartment[0].district}
                </div>

                <div>
                    {this.props.apartment[0].area}
                </div> */}




            </div>
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        apartment: state.content.apartment,
        photos: state.content.photos,
        planner: state.content.planner
    }
};

const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => {
    return {
        // loadPhotos: (apartmentId: number) => dispatch(loadPhotos(apartmentId)),
        getAllData: (apartmentId: number) => dispatch(getAllData(apartmentId)),
        getImages: (apartmentId: number) => dispatch(getImages(apartmentId)),
        getFloorPlan: (apartmentId: number) => dispatch(getFloorPlan(apartmentId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);