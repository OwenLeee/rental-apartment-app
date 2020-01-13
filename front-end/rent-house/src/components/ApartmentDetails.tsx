import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { IApartment } from '../redux/apartment/state';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { listApartmentsThunk } from '../redux/apartment/thunks';
import { connect } from 'react-redux';
import { FaBed, FaBath, FaParking } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";




interface IApartmentProps {
  apartments: IApartment[];
  listApartment: (keywords: string, propertyType: string, minPrice: string, maxPrice: string,
    bedrooms: string, bathrooms: string, isFurniture: boolean, isCarpark: boolean) => void
}



class ApartmentDetails extends React.Component<IApartmentProps> {

  constructor(props: IApartmentProps) {
    super(props);

  }

  componentDidMount() {
    this.props.listApartment('Sheung', 'Partitioned Flat', '10000', '30000', '2', '1', true, false);
  }


  public render() {
    return (

      this.props.apartments.map(apartment => <div key={apartment.id} className="apartmentContainer" style={{ outline: "1px", minHeight: "10rem", borderColor: "black", display: "flex", alignItems: "stretch", borderTop: "5px", paddingRight: "5px"}}>
        <div>
          <Carousel style={{ width: "15vw" }}>
            <Carousel.Item style={{ width: "100%" }}>
              <img
                className="d-block w-100"
                src=""
                alt="First slide"
              />

            </Carousel.Item>
            <Carousel.Item style={{ width: "100%" }}>
              <img
                className="d-block w-100"
                src=""
                alt="Third slide"
              />

            </Carousel.Item>
            <Carousel.Item style={{ width: "100%" }}>
              <img
                className="d-block w-100"
                src=""
                alt="Third slide"
              />

            </Carousel.Item>
          </Carousel>
        </div>

        <div className="apartmentDetails" style={{ height: "100%", width: "70%", display: "flex", flexDirection: "column" }}>
          <div className="detailTitle" style={{ display: "flex", justifyContent: "space-between" }}> <p> {apartment.district}, {apartment.area} </p>  <p> {apartment.house_type} </p></div>
          <div> <p> {apartment.address_building}, {apartment.address_block}, {apartment.level} Level </p></div>
          <div> <p> Rental Price: ${apartment.rental_price}</p> </div>
          <div className="detailArea" style={{ display: "flex", justifyContent: "space-between" }}> <div> Saleable/Gross: {apartment.saleable_area}/{apartment.gross_floor_area} </div>  <div> <FaBed size={30} />  {apartment.bedrooms} </div> <div> <FaBath size={30}/>  {apartment.bathrooms} </div>  <div> {apartment.is_furniture? <GiSofa size={30} /> : <GiSofa size={30} />} </div> <div> {apartment.is_carpark? <FaParking size={30} /> : <FaParking size={30} />} </div> </div>
        </div>
      </div>
      )
    )
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    apartments: state.apartment.apartments
  }
}

const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => {
  return {
    listApartment: (keywords: string, propertyType: string, minPrice: string, maxPrice: string,
      bedrooms: string, bathrooms: string, isFurniture: boolean, isCarpark: boolean) => dispatch(listApartmentsThunk('Sheung', 'Partitioned Flat', '10000', '30000', '2', '1', true, false))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ApartmentDetails); 