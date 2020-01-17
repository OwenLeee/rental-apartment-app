import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { IApartment, ISearchConditions } from '../redux/apartment/state';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { listApartmentsThunk } from '../redux/apartment/thunks';
import { connect } from 'react-redux';
import { FaBed, FaBath, FaParking, FaBoxOpen } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";




interface IApartmentProps {
  apartments: IApartment[];
  searchBarConditions: ISearchConditions;
  listApartment: (keywords: string, propertyType: string, minPrice: number, maxPrice: number,
    bedrooms: string, bathrooms: string, isFurniture: boolean, isStoreroom: boolean) => void
}



class ApartmentDetails extends React.Component<IApartmentProps> {

  constructor(props: IApartmentProps) {
    super(props);

  }


  componentDidMount() {
    this.props.listApartment(this.props.searchBarConditions.keywords, this.props.searchBarConditions.propertyType, this.props.searchBarConditions.minPrice, this.props.searchBarConditions.maxPrice,
      this.props.searchBarConditions.bedrooms, this.props.searchBarConditions.bathrooms, this.props.searchBarConditions.isFurniture, this.props.searchBarConditions.isStoreroom);
  }

  componentDidUpdate() {
    this.props.listApartment(this.props.searchBarConditions.keywords, this.props.searchBarConditions.propertyType, this.props.searchBarConditions.minPrice, this.props.searchBarConditions.maxPrice,
      this.props.searchBarConditions.bedrooms, this.props.searchBarConditions.bathrooms, this.props.searchBarConditions.isFurniture, this.props.searchBarConditions.isStoreroom);
  }

  // private addToFavourite = (id: number) => {

  // }



  public render() {
    return (
      <>
        {this.props.apartments.length > 0 ?
          this.props.apartments.map(apartment => <div key={apartment.id} className="apartmentContainer p-3" style={{ display: "flex", alignItems: "stretch" }}>
            <div className="col-3" /*style={{position: "relative"}}*/>
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
                    alt="Third slide"
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

            <div className="apartmentDetails col-9" style={{ height: "100%", width: "70%", display: "flex", flexDirection: "column", flexWrap: "wrap", }}>
              <div className="detailTitle" style={{ display: "flex", justifyContent: "space-between" }}> <p> {apartment.district}, {apartment.area} </p>  <p> {apartment.house_type} </p></div>
              <div> <p> {apartment.address_building}, {apartment.address_block}, {apartment.level} Level </p></div>
              <div> <p> Rental Price: ${apartment.rental_price}</p> </div>
              <div className="detailArea" style={{ display: "flex", justifyContent: "space-between" }}> <div> Saleable/Gross: {apartment.saleable_area}"Sq.ft / {apartment.gross_floor_area}"Sq.ft </div>
                <div> <FaBed size={30} />  {apartment.bedrooms} </div> <div> <FaBath size={30} />  {apartment.bathrooms} </div>  <div> {apartment.is_furniture ? <GiSofa size={30} /> : <GiSofa size={30} />} </div> <div> {apartment.is_storeroom ? <FaBoxOpen size={30} /> : <FaParking size={30} />} </div> </div>
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
    listApartment: (keywords: string, propertyType: string, minPrice: number, maxPrice: number,
      bedrooms: string, bathrooms: string, isFurniture: boolean, isStoreroom: boolean) => dispatch(listApartmentsThunk(keywords, propertyType, minPrice, maxPrice, bedrooms, bathrooms, isFurniture, isStoreroom))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ApartmentDetails); 


//  <div className="p-2" style={{ position: "absolute", display:"flex", justifyContent: "flex-end", alignItems: "flex-end", bottom:"0", width:"100%"}}> 
//               <FaHeart onClick={()=> this.props.addToFavourite(apartment.id)} size={20}/>  
//               </div> 