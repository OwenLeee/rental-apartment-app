import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';


class ApartmentDetails extends React.Component {

    public render() {
        return (
            <div className="apartmentContainer" style={{ outline: "1px", height: "6rem", borderColor: "black", display:"flex", alignItems: "stretch", borderTop: "5px"}}>
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
  
            <div className="apartmentDetails" style={{ height: "100%", width: "70%", display: "flex", flexDirection:"column" }}>
            <div className="detailTitle" style={{display: "flex", justifyContent: "space-between"}}> <div> District, Area </div>  <div> Property types </div></div>
            <div> <p> Building Name: </p></div>
            <div> <p> Rental Price: </p> </div>
            <div className="detailArea" style={{display: "flex", justifyContent: "space-between"}}> <div> saleable/gross </div>  <div> bedrooms </div> <div> bathrooms </div>  <div> isFurniture? </div> <div> isCarpark? </div> </div>
          </div>
          </div>
        )
    }
}

export default ApartmentDetails; 