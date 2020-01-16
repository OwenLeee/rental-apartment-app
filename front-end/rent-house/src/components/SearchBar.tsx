import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { IReferenceTableState } from '../redux/referenceTable/state';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { getBeds, getTypes, getBaths } from '../redux/referenceTable/thunk';
import { connect } from 'react-redux';
import { ISearchConditions } from '../redux/apartment/state'
import { searchApartments } from '../redux/apartment/actions'



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
    { label: "$55,000", value: 55000 }
]

const trueFalseTable = [
    { label: "Yes", value: true },
    { label: "No", value: false }]


const placeHolder = {
    houseType: "House Type", 
    bedrooms: "Bedrooms", 
    bathrooms: "Bathrooms", 
    minPrice: "Min. Price", 
    maxPrice: "Max. Price", 
    storeroom: "Storeroom?",
    furniture: "Furniture?"
}

export interface ISearchProps {
    referenceTable: IReferenceTableState;
    searchBarConditions: ISearchConditions; 
    getAllTables: () => void; 
    searchApartments: (conditions: any) => void; 
}

class SearchBar extends Component<ISearchProps, {}>{

    constructor(props: ISearchProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllTables();
    }

    // componentDidUpdate() {
    //     console.log(this.props.referenceTable.apartmentType.map(type => type.house_type).map(name => ({label: name})));
    // }
    

    handleChange = (selectedOption:any, actionMeta:any) => {
        console.log({[actionMeta.name]: selectedOption.value});
        this.props.searchApartments({[actionMeta.name]: selectedOption.value});
      };

    componentDidUpdate(prevProps: ISearchProps) {
        console.log(prevProps);
    }

    public render() {
        let houseType = this.props.referenceTable.apartmentType.map(type => type.house_type).map(name => ({ label: name, value: name }));
        let bedrooms = this.props.referenceTable.bathrooms.map(type => type.bathrooms).map(name => ({ label: name, value: name }))
        let bathrooms = this.props.referenceTable.bedrooms.map(type => type.bedrooms).map(name => ({ label: name, value: name }))        
        return (<>

        <h1>{this.props.searchBarConditions.bedrooms}</h1>
            <Form>
                <div className="col-md-12">
                    <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        <Input type="text" name="keywords" id="exampleAddress" placeholder="Address Keywords" /*onChange={}*/ />
                    </FormGroup>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

                    <div className="col-md-3"><Select placeholder={placeHolder.houseType} name="propertyType" options={houseType} onChange={this.handleChange}/></div>
                    <div className="col-md-3"><Select placeholder={placeHolder.bedrooms} name="bedrooms" options={bedrooms} components={animatedComponents} onChange={this.handleChange}/></div>
                    <div className="col-md-3"><Select placeholder={placeHolder.bathrooms} name="bathrooms" options={bathrooms} components={animatedComponents} onChange={this.handleChange}/></div>
                    <div className="col-md-3" id="try"><Select placeholder={placeHolder.minPrice} name="minPrice"  options={priceRange} onChange={this.handleChange}/></div>
                    <div className="col-md-3" id="try"><Select placeholder={placeHolder.maxPrice} name="maxPrice"  options={priceRange} onChange={this.handleChange}/></div>
                    <div className="col-md-3" id="min"><Select placeholder={placeHolder.furniture} name="isFurniture" options={trueFalseTable} components={animatedComponents} onChange={this.handleChange}/></div>
                    <div className="col-md-3" id="max"><Select placeholder={placeHolder.storeroom} name="isStoreroom" options={trueFalseTable} components={animatedComponents} onChange={this.handleChange}/></div>
                </div>
            </Form>
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
        },
        searchApartments: (conditions: any) => dispatch(searchApartments(conditions))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);


