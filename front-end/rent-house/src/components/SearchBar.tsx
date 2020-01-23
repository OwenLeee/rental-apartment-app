import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { /*Form,*/ FormGroup,/* Label,*/ Input, Button } from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { IReferenceTableState } from '../redux/referenceTable/state';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { getBeds, getTypes, getBaths, getDistrict } from '../redux/referenceTable/thunk';
import { connect } from 'react-redux';
import { ISearchConditions } from '../redux/apartment/state'
import { searchApartments } from '../redux/apartment/actions'
import { listApartmentsThunk } from '../redux/apartment/thunks';
import "../scss/SearchBar.scss";
import LocationSearchInput from './HotSpotSearchBar';


interface Options {
    label: string;
    value: string | number | boolean;
}

interface AreaOptions {
    label: string;
    options: {
        label: string;
        value: string;
    }[];
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
    { label: "All", value: -1 }
]

const furnitureTable = [
    { label: "Furniture: Yes", value: 1 },
    { label: "Furniture: No", value: 2 },
    { label: "Furniture: Why not both?", value: 3 }]

const carparkTable = [
    { label: "Carpark: Yes", value: 1 },
    { label: "Carpark: No", value: 2 },
    { label: "Carpark: Why not both?", value: 3 }]

const placeHolder = {
    houseType: "House Type",
    areas: "District",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    minPrice: "Min. Price",
    maxPrice: "Max. Price",
    carpark: "Carpark?",
    furniture: "Furniture?"
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
    // fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    // textAlign: "center"
};




export interface ISearchProps {
    referenceTable: IReferenceTableState;
    searchBarConditions: ISearchConditions;
    getAllTables: () => void;
    searchApartments: (conditions: any) => void;
    listApartment: (keywords: string, propertyType: string, area: string, minPrice: number, maxPrice: number,
        bedrooms: string, bathrooms: string, isFurniture: number, isCarpark: number) => void;
}

class SearchBar extends Component<ISearchProps, {}>{

    // constructor(props: ISearchProps) {
    //     super(props);
    // }

    private changed = false;

    componentDidMount() {
        this.props.getAllTables();
        this.props.listApartment(this.props.searchBarConditions.keywords, this.props.searchBarConditions.propertyType, this.props.searchBarConditions.area, this.props.searchBarConditions.minPrice, this.props.searchBarConditions.maxPrice,
            this.props.searchBarConditions.bedrooms, this.props.searchBarConditions.bathrooms, this.props.searchBarConditions.isFurniture, this.props.searchBarConditions.isCarpark);
    }


    handleChange = (selectedOption: any, actionMeta: any) => {
        this.props.searchApartments({ [actionMeta.name]: selectedOption.value });
        this.changed = true;
    };

    handleChangeForAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.searchApartments({ keywords: event.target.value });
        this.changed = true;
    }

    handleResetSearchConditions = () => {
        this.props.searchApartments({
            keywords: "",
            propertyType: "",
            area: "",
            bedrooms: "",
            bathrooms: "",
            minPrice: 0,
            maxPrice: 0,
            isStoreroom: 4,
            isCarpark: 4
        })
        this.changed = true;
    }

    componentDidUpdate() {
        // console.log(this.changed);
        if (this.changed) {
            this.changed = false;
            this.props.listApartment(this.props.searchBarConditions.keywords, this.props.searchBarConditions.propertyType, this.props.searchBarConditions.area, this.props.searchBarConditions.minPrice, this.props.searchBarConditions.maxPrice,
                this.props.searchBarConditions.bedrooms, this.props.searchBarConditions.bathrooms, this.props.searchBarConditions.isFurniture, this.props.searchBarConditions.isCarpark);
        }
    }

    formatGroupLabel = (data: any) => (
        <div style={groupStyles}>
            <span>{data.label}</span>
            <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
    );

    defaultValue = (data: any, options: Options[] | AreaOptions[], name: keyof ISearchConditions) => {
        if (data === "" || data === 0 || data === 4) {
            return data = null;
        } else if (name === "area") {
            return data = (options as AreaOptions[])[0].options.find(item => item.value === this.props.searchBarConditions[name])
        } else {
            // eslint-disable-next-line
            return data = (options as Options[]).find(items => items.value === this.props.searchBarConditions[name])
        }
    }


    public render() {
        let houseType = this.props.referenceTable.apartmentType.map(type => type.house_type).map(name => ({ label: `${name}`, value: name })).concat({ label: "All Types", value: "All" });
        let bedrooms = this.props.referenceTable.bedrooms.map(type => type.bedrooms).map(name => ({ label: `Bedrooms: ${name}`, value: name })).concat({ label: "All", value: "All" });
        let bathrooms = this.props.referenceTable.bathrooms.map(type => type.bathrooms).map(name => ({ label: `Bathrooms: ${name}`, value: name })).concat({ label: "All", value: "All" });
        let maxPriceFilter = priceRange.filter(price => price.value > this.props.searchBarConditions.minPrice).concat({ label: "All", value: -1 });
        // console.log(this.props.referenceTable.areaDistrict);
        // // console.log(this.props.referenceTable.areaDistrict.map(area => Object.values(area)[0]));
        // console.log(this.props.referenceTable.areaDistrict.map(area => ({ label: area.district, options: area.area.map(area2 => ({ value: area2.area, label: area2.area })) })));
        let areas = this.props.referenceTable.areaDistrict.map(area => ({ label: area.district, options: area.area.map(area2 => ({ value: area2.area, label: area2.area })) })).concat({ label: "All", options: [{ value: "All", label: "All" }] });


        return (<>

            <div className="col-8" >

                <FormGroup className="p-2" style={{ margin: "0px", display:"flex" }}>
                    <div className="col-11 search-bar search-bar-input"> <Input className="search-bar-input"type="text" name="keywords" id="exampleAddress" placeholder="Address Keywords" value={this.props.searchBarConditions.keywords} onChange={this.handleChangeForAddress} /></div>
                    <div className="col-1 search-bar" style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.1rem" }}>
                        <div style={{ margin: "0px", display: "flex", alignItems: "center" }}> <Button style={{width:"100%"}} onClick={this.handleResetSearchConditions}>Reset</Button> </div>
                    </div>


                </FormGroup>

                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

                    <div className="col-md-3 p-2"><Select value={this.defaultValue(this.props.searchBarConditions.propertyType, houseType, "propertyType")} placeholder={placeHolder.houseType} name="propertyType" options={houseType} components={animatedComponents} onChange={this.handleChange} /></div>
                    <div className="col-md-3 p-2"><Select value={this.defaultValue(this.props.searchBarConditions.area, areas, "area")} placeholder={placeHolder.areas} name="area" options={areas} formatGroupLabel={this.formatGroupLabel} components={animatedComponents} onChange={this.handleChange} /></div>
                    <div className="col-md-3 p-2"><Select value={this.defaultValue(this.props.searchBarConditions.minPrice, priceRange, "minPrice")} placeholder={placeHolder.minPrice} name="minPrice" options={priceRange} components={animatedComponents} onChange={this.handleChange} /></div>
                    <div className="col-md-3 p-2"><Select value={this.defaultValue(this.props.searchBarConditions.maxPrice, maxPriceFilter, "maxPrice")} placeholder={placeHolder.maxPrice} name="maxPrice" options={maxPriceFilter} components={animatedComponents} onChange={this.handleChange} /></div>
                    <div className="col-md-3 p-2"><Select value={this.defaultValue(this.props.searchBarConditions.bedrooms, bedrooms, "bedrooms")} placeholder={placeHolder.bedrooms} name="bedrooms" options={bedrooms} components={animatedComponents} onChange={this.handleChange} /></div>
                    <div className="col-md-3 p-2"><Select value={this.defaultValue(this.props.searchBarConditions.bathrooms, bathrooms, "bathrooms")} placeholder={placeHolder.bathrooms} name="bathrooms" options={bathrooms} components={animatedComponents} onChange={this.handleChange} /></div>
                    <div className="col-md-3 p-2"><Select value={this.defaultValue(this.props.searchBarConditions.isFurniture, furnitureTable, "isFurniture")} placeholder={placeHolder.furniture} name="isFurniture" options={furnitureTable} components={animatedComponents} onChange={this.handleChange} /></div>
                    <div className="col-md-3 p-2"><Select value={this.defaultValue(this.props.searchBarConditions.isCarpark, carparkTable, "isCarpark")} placeholder={placeHolder.carpark} name="isCarpark" options={carparkTable} components={animatedComponents} onChange={this.handleChange} /></div>
                </div>
            </div>
            <div className="col-4" >

                <LocationSearchInput />

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
        getAllTables: () => {
            dispatch(getBeds());
            dispatch(getBaths());
            dispatch(getTypes());
            dispatch(getDistrict());
        },
        searchApartments: (conditions: any) => dispatch(searchApartments(conditions)),
        listApartment: (keywords: string, propertyType: string, area: string, minPrice: number, maxPrice: number,
            bedrooms: string, bathrooms: string, isFurniture: number, isCarpark: number) => dispatch(listApartmentsThunk(keywords, propertyType, area, minPrice, maxPrice, bedrooms, bathrooms, isFurniture, isCarpark))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);


