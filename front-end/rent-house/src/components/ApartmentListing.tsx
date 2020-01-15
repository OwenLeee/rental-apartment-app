import React from 'react';
import ApartmentListDetails from './ApartmentDetails';
import SimpleMap from './ApartmentMap';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
class ApartmentList extends React.Component {

    public render() {
        return <>
            <div className="container" style={{ width: "100%", margin: "3rem"}}>
                <div ><SearchBar /> </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="listContainer" style={{ height: "100vh", width: "50%" }}>
                        <div className="topBar" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "30px" }}>
                            <div className="topTitle" style={{ paddingLeft: "0.5rem", fontSize: "25px", fontWeight: "bold" }}>Flats</div>
                            <div className="sortList" style={{ paddingRight: "0.5rem", fontSize: "20px" }}>
                                <select > <option value="Sort by: Price">Sort by: Price </option>
                                    <option value="Sort by: Area">Sort by: Area </option></select>
                            </div>
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
