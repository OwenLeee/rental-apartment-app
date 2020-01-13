import React from 'react';
import ApartmentListDetails from './ApartmentDetails';

class ApartmentList extends React.Component {

    public render() {
        return (
            <div className="listContainer" style={{ height: "100vh", width: "50vw" }}>
                <div className="topBar" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <div className="topTitle" style={{ paddingLeft: "0.5rem", fontSize: "25px", fontWeight: "bold" }}>Flats</div>
                    <div className="sortList" style={{ paddingRight: "0.5rem", fontSize: "20px" }}>
                        <select > <option value="Sort by: Price">Sort by: Price </option>
                            <option value="Sort by: Area">Sort by: Area </option></select>
                    </div>
                </div>
                <ApartmentListDetails />
            </div>
        )
    }
}

export default ApartmentList; 
