import React, { useEffect, useState } from 'react';
// import { Link, Switch, Route } from 'react-router-dom';
import '../scss/ProcedureBar.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, getDistrict, getLevel } from '../redux/referenceTable/thunk';
import { postDetailsOne } from '../redux/listing/thunk'
import { IRootState } from '../redux/store';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GoogleMapReact from 'google-map-react';
import Marker from './FormMapMarker';
import ProcedureBar from './ProcedureBar';

// import { Form } from 'react-bootstrap';

interface IForm {
    type: string;
    district: string;
    area: string;
    block: string;
    floorLevel: string

};



const DetailsOne: React.FC = () => {
    const [district, setDistrict] = useState('');

    ////////// Google map Autocomplete //////////
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const handleSelect = async (value: string) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng)
    };
    const country = (): google.maps.GeocoderComponentRestrictions => {
        return ({ country: 'hk' });
    };
    const searchOptions = {
        componentRestrictions: country()
    };

    ///////////// Hooks Form /////////////
    const { register, handleSubmit, errors } = useForm<IForm>();
    const onSubmit = (data: IForm) => {

        const typeId = (apartmentType.filter(type => type.house_type === data.type))[0].id;
        const levelId = (floorLevel.filter(level => level.level === data.floorLevel))[0].id;

        dispatch(postDetailsOne(typeId, data.area, data.district, levelId, address, data.block, coordinates.lat, coordinates.lng));
    };

    ///////////// mapStateToProps /////////////
    const apartmentType = useSelector((state: IRootState) => state.referenceTable.apartmentType);
    const areaDistrict = useSelector((state: IRootState) => state.referenceTable.areaDistrict);
    const floorLevel = useSelector((state: IRootState) => state.referenceTable.floorLevel);


    ///////////// DidMount  /////////////
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes());
        dispatch(getDistrict());
        dispatch(getLevel());

    }, [dispatch]);


    ///////////// DidMount or Update or WillUnMount /////////////
    useEffect(() => {
        if (errors && errors.type) {
            alert(errors.type.message)
        }
    }, [errors]);



    let districtChosen = (areaDistrict.filter((districts => districts.district === district)))[0];


    return (
        <div>
            <ProcedureBar procedure="Map"/>
            {/* <div className="procedure-buttons-wrap">
                <div className="procedure-buttons">Floor Planner</div>
                <div className="line"></div>
                <div className="procedure-buttons">Photos</div>
                <div className="line"></div>
                <div className="procedure-buttons">Video</div>
                <div className="line"></div>
                <div className="procedure-buttons">Detail</div>
                <div className="line"></div>
                <div className="procedure-buttons">Map</div>
            </div> */}
            <div>
                {/* <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/scores" component={Scores} />
                    <Route path="/board" component={Board} />
                    <Route path="/about" component={About} />
                    <Route component={NoMatch} />
                </Switch> */}
            </div>




            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="type" ref={register({ required: "Please fill in all required fields" })}>
                    <option value="">Apartment Type</option>
                    {apartmentType.map(type => {
                        return (
                            <option key={type.id} value={type.house_type}>{type.house_type}</option>
                        );
                    }
                    )}
                </select>

                <select name="district" ref={register({ required: "Please fill in all required fields" })} onChange={e => { setDistrict(e.target.value) }}>
                    <option value=''>District</option>
                    {areaDistrict
                        .map((district, i) => {
                            return (
                                <option key={i} value={district.district}>{district.district}</option>
                            )
                        })
                    }
                </select>

                {districtChosen ?
                    <select name="area" ref={register({ required: true })}>
                        <option value=''>Area</option>
                        {districtChosen ?
                            districtChosen.area.map(area => {
                                return (
                                    <option key={area.id} value={area.area}>{area.area}</option>
                                )
                            })
                            :
                            <div></div>
                        }
                    </select>
                    :
                    <div></div>
                }

                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} searchOptions={searchOptions}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <div>Latitude: {coordinates.lat}</div>
                            <div>Longitude: {coordinates.lng}</div>
                            <input {...getInputProps({ placeholder: "Type address" })} />

                            <div>
                                {loading ? <div>...loading</div> : null}

                                {suggestions.map((suggestion) => {
                                    const style = {
                                        backgroundColor: suggestion.active ? '#9F704F' : '#fff'
                                    };
                                    return <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                })}

                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>

                <input type="text" placeholder="Block" name="block" ref={register} />


                <select name="floorLevel" ref={register({ required: true })}>
                    <option value=''>Floor Level</option>
                    {floorLevel
                        .map(level => {
                            return (
                                <option key={level.id} value={level.level}>{level.level}</option>
                            )
                        })
                    }
                </select>

                <div style={{ height: '20vh', width: '20%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY as string }}
                        defaultCenter={{ lat: 22.372527, lng: 114.107623 }}
                        center={{ lat: coordinates.lat, lng: coordinates.lng }}
                        defaultZoom={10}
                        resetBoundsOnResize={true}
                    >
                        <Marker
                            lat={coordinates.lat}
                            lng={coordinates.lng}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>

                <input value="next" type="submit" />
            </form>

        </div>
    )
};



export default DetailsOne;