import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './MapMarker';
import { useSelector, shallowEqual } from 'react-redux';
import { IRootState } from '../redux/store';
import mapStyle from '../mapStyle.json';



const SimpleMap = (props: any) => {
    const apartments = useSelector((state: IRootState) => state.apartment.apartments, shallowEqual);
    // const [center, setCenter] = useState();
    const [center, setCenter] = useState({ lat: 22, lng: 114 });

    useEffect(() => {
        if (apartments.length > 0) {
            const ap = apartments[0];
            // console.log(ap);
            setCenter({ lat: ap.lat, lng: ap.lng });
        }
    }, [apartments]);

// eslint-disable-next-line
    const [zoom, setZoom] = useState(17);
    if (apartments.length < 1) {
        return <div></div>
    }

    return (
        <div style={{ height: '100vh', width: '50%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDIWVSGTmPDfNIEFwoCcJ_XNqU28z3XLno' }}
                defaultCenter={center}
                defaultZoom={zoom}
                options={{
                    styles:
                        mapStyle
                }}

            >


                {apartments.map(e => {
                    return <Marker
                        key={e.id}
                        lat={e.lat}
                        lng={e.lng}
                        name="My Marker"
                    // color="blue"
                    />
                })
                }
            </GoogleMapReact>
        </div>
    );
}

export default SimpleMap;

