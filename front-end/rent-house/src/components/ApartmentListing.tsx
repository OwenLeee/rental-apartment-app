import React from 'react';
import ApartmentListDetails from './ApartmentDetails';
import SimpleMap from './ApartmentMap';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/ApartmentListing.scss';

class ApartmentList extends React.Component {

    public render() {
        return <>
            <div className="container-fluid p-3">
                <div className="row"><SearchBar /> </div>
                <div style={{ display: "flex", flexDirection: "row" , overflow: "auto"}}>
                    <div className="listContainer" style={{ height: "100vh", width: "50%" }}>
                        <div className="topBar p-3" >
                            <div  > <h3 className="topTitle" > Flats</h3></div>
                            {/* <div className="sortList" style={{ fontSize: "20px" }}>
                                <select > <option value="Sort by: Price">Sort by: Price </option>
                                    <option value="Sort by: Area">Sort by: Area </option></select>
                            </div> */}
                        </div>
                        <ApartmentListDetails />
                    </div>
                    <SimpleMap />
                </div>          
            </div>
        </>
    }
}

export default ApartmentList; 
