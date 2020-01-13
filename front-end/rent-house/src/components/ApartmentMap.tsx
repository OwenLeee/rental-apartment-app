import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './MapMarker';

const SimpleMap = (props: any) => {
    const [center, setCenter] = useState({lat: 22.372527, lng: 114.107623});
    const [zoom, setZoom] = useState(17);
    return (
        <div style={{ height: '100vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDIWVSGTmPDfNIEFwoCcJ_XNqU28z3XLno' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={22.372527}
            lng={114.107623}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;