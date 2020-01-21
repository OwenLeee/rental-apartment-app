import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { IApartment, ISearchConditions } from '../redux/apartment/state';
import { IRootState, ReduxThunkDispatch } from '../redux/store';

import { connect } from 'react-redux';
import { FaBed, FaBath, FaParking, FaBoxOpen } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
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

  // constructor(props: IApartmentProps) {
  //   super(props);

  // }


  // componentDidMount() {
  //   this.props.listApartment(this.props.searchBarConditions.keywords, this.props.searchBarConditions.propertyType, this.props.searchBarConditions.minPrice, this.props.searchBarConditions.maxPrice,
  //     this.props.searchBarConditions.bedrooms, this.props.searchBarConditions.bathrooms, this.props.searchBarConditions.isFurniture, this.props.searchBarConditions.isStoreroom);
  // }

  // private addToFavourite = (id: number) => {

  // }



  public render() {
    return (
      <>
        {this.props.apartments.length > 0 ?
          this.props.apartments.map(apartment => <div key={apartment.id} className="apartmentContainer p-3" style={{ display: "flex", alignItems: "stretch" }}>
            <div className="col-4" style={{ padding: "0px" }}>
              <Carousel >
                <Carousel.Item >
                  <img
                    className="d-block w-100"
                    src=""
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item >
                  <img
                    className="d-block w-100"
                    src=""
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item >
                  <img
                    className="d-block w-100"
                    src=""
                    alt="Third slide"
                  />
                </Carousel.Item>

              </Carousel>

            </div>

            <div className="container col-8 building-content" onClick={() => this.props.directToRentDetailPage(apartment.id)}>
              <div className="row building-row" >
                <div className="building-name col-7"> <p> {apartment.address_building} </p> </div>
                <div className="house-type col-5"> <p> {apartment.house_type} </p> </div>
              </div>
              <div className="row">
                <div className="district-area col-12"> <p>{apartment.area} | {apartment.level} Level </p> </div>
              </div>
              <div className="row square-row" >
                <div className="col-12 square"><p> {apartment.gross_floor_area} SQ FT | HKD <NumberFormat value={apartment.rental_price} displayType={'text'} thousandSeparator={true} /*prefix={'$'}*/ /> </p> </div>
              </div>
              <div className="row icon-row" >
                <div className="bedrooms-icon col-3"> <div className="container"><FaBed className="col-12 bed-icon"size={30} />  <div className="col-2bed-num"><p>{toDisplayRoomsNumber(apartment.bedrooms)}</p></div></div>  </div>
                <div className="bathrooms-icon col-3"> <FaBath size={30} /> <p> {toDisplayRoomsNumber(apartment.bathrooms)} </p>  </div>
                <div className="furniture-icon col-3"> {apartment.is_furniture ? <GiSofa size={30} /> : <GiSofa size={30} />} </div>
                <div className="storeroom-icon col-3"> {apartment.is_storeroom ? <FaBoxOpen size={30} /> : <FaBoxOpen size={30} />} </div>
              </div>
              {/* <div className="detailTitle" style={{ display: "flex", justifyContent: "space-between" }}> <p> {apartment.district}, {apartment.area} </p>  <p> {apartment.house_type} </p></div>
              <div> <p> {apartment.address_building}, {apartment.address_block}, {apartment.level} Level </p></div>
              <div> <p> Rental Price: ${apartment.rental_price}</p> </div>
              <div className="detailArea" style={{ display: "flex", justifyContent: "space-between" }}>
                <div> Saleable/Gross: {apartment.saleable_area}"Sq.ft / {apartment.gross_floor_area}"Sq.ft </div>
                <div> <FaBed size={30} />  {apartment.bedrooms} </div>
                <div> <FaBath size={30} />  {apartment.bathrooms} </div>
                <div> {apartment.is_furniture ? <GiSofa size={30} /> : <GiSofa size={30} />} </div>
                <div> {apartment.is_storeroom ? <FaBoxOpen size={30} /> : <FaParking size={30} />} </div>
              </div> */}
            </div>
          </div>
          ) :
          <div className="col-12 p-3" style={{ display: "flex", alignItems: "center", color: "grey" }}>
            <div> <h1> No Result... </h1></div>
          </div>}
      </>
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


//  <div className="p-2" style={{ position: "absolute", display:"flex", justifyContent: "flex-end", alignItems: "flex-end", bottom:"0", width:"100%"}}> 
//               <FaHeart onClick={()=> this.props.addToFavourite(apartment.id)} size={20}/>  
//               </div> 