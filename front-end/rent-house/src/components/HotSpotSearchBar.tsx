import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { connect } from 'react-redux';
import { searchHotSpotPlace } from '../redux/apartment/actions';
import { Input, FormGroup, Button } from 'reactstrap';


export interface State {
    address: string;
}

export interface IHotSpotProps {

    searchHotSpotPlace: (latLng: any) => void;
}

const searchOptions = {
    componentRestrictions: { country: 'hk' }
};

class LocationSearchInput extends React.Component<IHotSpotProps, State> {
    constructor(props: IHotSpotProps) {
        super(props);
        this.state = { address: '' };
    }

    handleChange = (address: any) => {
        // console.log(address); 
        // console.log(this.state.address)
        this.setState({ address });
    };

    handleSelect = async (address: any) => {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        this.props.searchHotSpotPlace(latLng);
        this.setState({ address });
    };

    handleResetHotSpotConditions = () => {
        this.setState( {address: ''});
        this.props.searchHotSpotPlace(({lat: 0, lng: 0})); 
    }


    render() {
        return (
            <>
            <FormGroup className="p-2" style={{ margin: "0px"}}>
                <div style={{margin: "0px", marginBottom:"0.12rem", display:"flex", justifyContent:"space-between"}}>
                    <div > <h3 style={{ marginBottom: '8px'}}>Hot Spot Location</h3> </div>
                    <div style={{margin: "0px", display:"flex", alignItems:"center"}}> <Button onClick={this.handleResetHotSpotConditions}>Reset</Button> </div>  
                </div>
                
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        searchOptions={searchOptions}
                        highlightFirstSuggestion={true}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className="col-12 p-0">
                                <Input style={{width: "100%"}} 
                                    {...getInputProps({
                                        placeholder: 'Searching hot spot...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container"  style={{height: "105px", overflow: "auto"}}>
                                    {loading && <div>Loading...</div>} 
                                    {/* {console.log(suggestions)} */}
                                    {suggestions.map(suggestion => {
                                        console.log(suggestion)
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'point    er' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                
                </FormGroup>
            </>
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    return {

    }
}

const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => {
    return {
        searchHotSpotPlace: (latLng: any) => dispatch(searchHotSpotPlace(latLng))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationSearchInput);