import * as React from 'react';
import Select from 'react-select';
import "../scss/HomePage.scss";
import { Input } from 'reactstrap';
import { Button } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';
import { IReferenceTableState } from '../redux/referenceTable/state';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { getTypes, getDistrict } from '../redux/referenceTable/thunk';
import { ISearchConditions } from '../redux/apartment/state';
import { listApartmentsThunk } from '../redux/apartment/thunks';
import { connect } from 'react-redux';
import { searchApartments } from '../redux/apartment/actions';
import { push } from "connected-react-router";

interface Options {
    label: string ; 
    value: string | number | boolean; 
}

interface AreaOptions{
    label: string; 
    options: {
        label: string;
        value: string; 
    } []; 
}


const animatedComponents = makeAnimated();

const priceRange = [
    { label: "$10,000", value: 10000 },
    { label: "$15,000", value: 15000 },
    { label: "$20,000", value: 20000 },
    { label: "$25,000", value: 25000 },
    { label: "$30,000", value: 30000 },
    { label: "$35,000", value: 35000 },
    { label: "$40,000", value: 40000 },
    { label: "$45,000", value: 45000 },
    { label: "$50,000", value: 50000 },
    { label: "$55,000", value: 55000 },
    { label: "All", value: 0 }
]

const placeHolder = {
    houseType: "House Type",
    areas: "District",
    minPrice: "Min. Price",
    maxPrice: "Max. Price"
}

const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
};
const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
};

export interface IHomePageProps {
    referenceTable: IReferenceTableState;
    searchBarConditions: ISearchConditions;
    getTypeDistrictTables: () => void;
    searchApartments: (conditions: any) => void;
    directToRentPage: () => void; 

}



class HomePage extends React.Component<IHomePageProps, {}>{


    constructor(props: IHomePageProps) {
        super(props);
    }


    handleChange = (selectedOption: any, actionMeta: any) => {
        this.props.searchApartments({ [actionMeta.name]: selectedOption.value });
    }

    handleChangeForKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.searchApartments({ keywords: event.target.value })
    }

    componentDidMount(){
        this.props.getTypeDistrictTables();
    }

    defaultValue = ( data : any, options: Options[] | AreaOptions[], name: keyof ISearchConditions) => {
        if (data === "" || data === 0 || data === 4 ){
           return data = null; 
        }  else if (name === "area"){
            return data = (options as AreaOptions[])[0].options.find(item => item.value === this.props.searchBarConditions[name])
        } else {
            return data = (options as Options[]).find(items => items.value === this .props.searchBarConditions[name])
        }       
    }


    public render() {
        let houseType = this.props.referenceTable.apartmentType.map(type => type.house_type).map(name => ({ label: `${name}`, value: name })).concat({ label: "All Types", value: "" });
        let maxPriceFilter = priceRange.filter(price => price.value > this.props.searchBarConditions.minPrice).concat({ label: "All", value: 0 });
        let areas = this.props.referenceTable.areaDistrict.map(area => ({ label: area.district, options: area.area.map(area2 => ({ value: area2.area, label: area2.area })) })).concat({ label: "All", options: [{value:"All", label:"All"}]});

        
        const formatGroupLabel = (data: any) => (
            <div style={groupStyles}>
                <span>{data.label}</span>
                <span style={groupBadgeStyles}>{data.options.length}</span>
            </div>
        );


      

        return (<>

            <div className="container-fluid home-page" style={{ height: "91.5vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="row" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {/* <div className="search-bar-box p-4"> */}
                    <div className="col-6" >
                        <div className="row" style={{ marginBottom: "0.5rem" }}>
                            <div className="col-10" style={{ paddingRight: "0px" }} >
                                <Input style={{ width: "100%", paddingRight: "5px" }} placeholder="Search..." type="text" onChange={this.handleChangeForKeywords} />
                            </div>
                            <div className="col-2" /*style={{ paddingLeft: "0px" }}*/>
                                <Button style={{ width: "100%", backgroundColor: "#9F704E", borderColor: "#9F704E" }}  onClick={this.props.directToRentPage}>Go!</Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <Select value={this.defaultValue(this.props.searchBarConditions.propertyType, houseType, "propertyType")} placeholder={placeHolder.houseType} name="propertyType" options={houseType} components={animatedComponents} onChange={this.handleChange} />
                            </div>
                            <div className="col-3">
                                <Select value={this.defaultValue(this.props.searchBarConditions.area, areas, "area")} placeholder={placeHolder.areas} name="area" options={areas} formatGroupLabel={formatGroupLabel} components={animatedComponents} onChange={this.handleChange} />
                            </div>
                            <div className="col-3">
                               <Select  value={ this.defaultValue(this.props.searchBarConditions.minPrice, priceRange, "minPrice")} placeholder={placeHolder.minPrice} name="minPrice" options={priceRange} components={animatedComponents} onChange={this.handleChange} />
                            </div>
                            <div className="col-3">
                               <Select value={ this.defaultValue(this.props.searchBarConditions.maxPrice, maxPriceFilter, "maxPrice")} placeholder={placeHolder.maxPrice} name="maxPrice" options={maxPriceFilter} components={animatedComponents} onChange={this.handleChange} />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>)
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        referenceTable: state.referenceTable,
        searchBarConditions: state.apartment.searchConditions
    }
}


const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => {
    return {
        getTypeDistrictTables: () => {
            dispatch(getTypes());
            dispatch(getDistrict());
        },
        searchApartments: (conditions: any) => dispatch(searchApartments(conditions)),
        listApartment: (keywords: string, propertyType: string, area: string, minPrice: number, maxPrice: number,
            bedrooms: string, bathrooms: string, isFurniture: number, isStoreroom: number) => dispatch(listApartmentsThunk(keywords, propertyType, area, minPrice, maxPrice, bedrooms, bathrooms, isFurniture, isStoreroom)), 
        directToRentPage: () => dispatch(push("/rent"))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage); 