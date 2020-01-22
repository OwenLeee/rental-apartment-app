import React, { useState/*, useEffect */} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './MapMarker';
import { useSelector, shallowEqual/*, useDispatch */} from 'react-redux';
import { IRootState } from '../redux/store';
import mapStyle from '../mapStyle.json';
import HotSpotMarker from './HotSpotMapMarker';
import '../scss/ApartmentMap.scss'; 
// import { push } from 'connected-react-router';



const SimpleMap = (props: any) => {
    const apartments = useSelector((state: IRootState) => state.apartment.apartments, shallowEqual);
   
    // const [center, setCenter] = useState();
    const [center,/* setCenter*/] = useState({ lat: 22.307956, lng: 114.190893 });
    const [zoom , /*setZoom*/] = useState(12);


    const hotSpotLocation = useSelector((state: IRootState) => state.apartment.location, shallowEqual); 
   
   

    return (
        
        <div className="map-style p-3" style={{ height: '100vh', width: '50%'}}>
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
                        id={e.id}
                        lat={e.lat}
                        lng={e.lng}
                        name={e.address_building}
                        price={e.rental_price}
                    // color="blue"
                    />
                })
                }

                <HotSpotMarker 
                lat = {hotSpotLocation.lat}
                lng = {hotSpotLocation.lng}
                name = "Hotspot"
                color = "red"
                /> 


            </GoogleMapReact>
        </div>
        
    );
}



export default SimpleMap;

