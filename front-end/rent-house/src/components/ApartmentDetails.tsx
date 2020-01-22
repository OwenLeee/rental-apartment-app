import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { IApartment, ISearchConditions } from '../redux/apartment/state';
import { IRootState, ReduxThunkDispatch } from '../redux/store';

import { connect } from 'react-redux';
import { /*FaBed, FaBath,*/FaShower, FaParking,/* FaBoxOpen,*/ FaCheck, FaTimes } from "react-icons/fa";
import { GiSofa, GiBed } from "react-icons/gi";
import NumberFormat from 'react-number-format';
import "../scss/ApartmentDetails.scss";
import { push } from 'connected-react-router';

interface IApartmentProps {
  apartments: IApartment[];
  searchBarConditions: ISearchConditions;
  directToRentDetailPage: (id: number) => void;
}

const toDisplayRoomsNumber = (value: string) => {
  if (value === "4 or above") {
    return value = "4+";
  } else if (value === "3 or above") {
    return value = "3+";
  } else {
    return value;
  }
}


class ApartmentDetails extends React.Component<IApartmentProps> {


  public render() {
    return (
      <div style={{ overflow: 'auto', height: "88vh" }}>
        {this.props.apartments.length > 0 ?
          this.props.apartments.sort((a, b) => { return a.rental_price - b.rental_price }).map(apartment => <div key={apartment.id} className="apartmentContainer p-3" style={{ display: "flex", alignItems: "stretch" }}>
 <div className="col-4" style={{ padding: "0px" }}>
<Carousel >
            {apartment.photos_path.length > 0 ? apartment.photos_path.map(photo => (
             
                
                  <Carousel.Item >
                    <img
                      className="d-block w-100"
                      src={`${photo.photo_path}`}
                      alt="House Photo"
                    />
                  </Carousel.Item>
               
          
            )) :
              <div style={{ padding: "0px", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center"  }}>
                <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                  <div className="col-12 blank-div">
                    <p > Will Be Provided Soon! </p>
                  </div>
                </div>
              </div>
            }
</Carousel>
</div>
            <div className="container col-8 building-content" onClick={() => this.props.directToRentDetailPage(apartment.id)}>
              <div className="row building-row" >
                <div className="building-name col-7"> <p className="p-margin building-title"> {apartment.address_building} </p> </div>
                <div className="house-type col-5"> <p className="p-margin building-house-type"> {apartment.house_type} </p> </div>
              </div>
              <div className="row">
                <div className="district-area col-12"> <p className="p-margin building-area-level">{apartment.area} | {apartment.level} Level </p> </div>
              </div>
              <div className="row square-row" >
                <div className="col-12 square"><p className="building-squarefeet" style={{ marginBottom: "15px" }}> <NumberFormat value={apartment.gross_floor_area} displayType={'text'} thousandSeparator={true} /*prefix={'$'}*/ /> SQ FT | HKD <NumberFormat value={apartment.rental_price} displayType={'text'} thousandSeparator={true} /*prefix={'$'}*/ /> </p> </div>
              </div>
              <div className="row icon-row icon-animation" >
                <div className="draft-info-icon-center col-3">
                  <div className="col-12 info-icon-center "> <GiBed className="sofa-icon" size={35} /> </div>
                  <div className="col-12 info-num-center"><p className="info-num" style={{ margin: "0px" }}>{toDisplayRoomsNumber(apartment.bedrooms)}</p></div>
                </div>
                <div className="draft-info-icon-center col-3">
                  <div className="col-12 info-icon-center"> <FaShower className="sofa-icon" size={35} /> </div>
                  <div className="col-12 info-num-center"><p className="info-num" style={{ margin: "0px" }}> {toDisplayRoomsNumber(apartment.bathrooms)} </p> </div>
                </div>
                <div className="draft-info-icon-center col-3">
                  <div className="col-12 info-icon-center"> <GiSofa className="sofa-icon" size={35} /> </div>
                  <div className="col-12 info-num-center">  {apartment.is_furniture ? <FaCheck size={20} /> : <FaTimes size={20} />}  </div>
                </div>
                <div className="draft-info-icon-center col-3">
                  <div className="col-12 info-icon-center"> <FaParking className="sofa-icon" size={35} /> </div>
                  <div className="col-12 info-num-center"> {apartment.is_carpark ? <FaCheck size={20} /> : <FaTimes size={20} />} </div>
                </div>
              </div>
            </div>
          </div>
          ) :
          <div className="col-12 p-3" style={{ display: "flex", alignItems: "center", color: "grey" }}>
            <div> <h1> No Result... </h1></div>
          </div>}
      </div>
    )
  }

}

const mapStateToProps = (state: IRootState) => {
  return {
    apartments: state.apartment.apartments,
    searchBarConditions: state.apartment.searchConditions
  }
}

const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => {
  return {
    directToRentDetailPage: (id: number) => dispatch(push(`/rent/content/${id}`))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ApartmentDetails);


//  <div className="p-2" style={{ position: "absolute", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", bottom: "0", width: "100%" }}>
//               <FaHeart onClick={()=> this.props.addToFavourite(apartment.id)} size={20}/>
//               </div> 