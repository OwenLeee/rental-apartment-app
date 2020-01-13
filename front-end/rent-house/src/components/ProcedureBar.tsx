import React, { useEffect, useState } from 'react';
// import { Link, Switch, Route } from 'react-router-dom';
import '../scss/ProcedureBar.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, getDistrict, getBeds, getBaths, getLevel } from '../redux/referenceTable/thunk';
import { IRootState } from '../redux/store';
// import { Form } from 'react-bootstrap';

interface IForm {
    type: string;
    district: string;
    area: string;
    bedrooms: string;
    bathrooms: string;
    floorLevel: string

};

const ListApartment: React.FC = () => {
    const [district, setDistrict] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<IForm>();
    const onSubmit = (data: IForm) => {
        console.log(
            {
                type: data.type,
                district: data.district,
                area: data.area,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                floorLevel: data.floorLevel
            }
        )
    };
    // console.log(errors);


    useEffect(() => {
        dispatch(getTypes());
        dispatch(getDistrict());
        dispatch(getBeds());
        dispatch(getBaths());
        dispatch(getLevel())
    }, [dispatch]);

    useEffect(() => {
        if (errors && errors.type) {
            alert(errors.type.message)
        }
    }, [errors]);

    const apartmentType = useSelector((state: IRootState) => state.referenceTable.apartmentType);
    const areaDistrict = useSelector((state: IRootState) => state.referenceTable.areaDistrict);
    const bedrooms = useSelector((state: IRootState) => state.referenceTable.bedrooms);
    const bathrooms = useSelector((state: IRootState) => state.referenceTable.bathrooms);
    const floorLevel = useSelector((state: IRootState) => state.referenceTable.floorLevel);
    let districtChosen = (areaDistrict.filter((districts => districts.district === district)))[0];

    return (
        <div>
            <div className="procedure-buttons-wrap">
                <div className="procedure-buttons">Floor Planner</div>
                <div className="line"></div>



                <div className="procedure-buttons">Photos</div>
                <div className="line"></div>
                <div className="procedure-buttons">Video</div>
                <div className="line"></div>
                <div className="procedure-buttons">Detail</div>
                <div className="line"></div>
                <div className="procedure-buttons">Map</div>
            </div>
            <div>
                {/* <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/scores" component={Scores} />
                    <Route path="/board" component={Board} />
                    <Route path="/about" component={About} />
                    <Route component={NoMatch} />
                </Switch> */}
            </div>

            {/* <Form > 
 
  <Form.Group onSubmit={handleSubmit(onSubmit)} controlId="exampleForm.ControlSelect1">
    <Form.Label>Apartment Type</Form.Label >
    <Form.Control as="select" name="type" ref={register({ required: "Please fill in all required fields" })}>
    {apartmentType.map((type, i) => {
                        return (
                            <option key={i} value={type.house_type}>{type.house_type}</option>
                        );
                    }
                    )}

    </Form.Control>
  </Form.Group>
</Form> */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="type" ref={register({ required: "Please fill in all required fields" })}>
                    <option value="">Apartment Type</option>
                    {apartmentType.map((type, i) => {
                        return (
                            <option key={i} value={type.house_type}>{type.house_type}</option>
                        );
                    }
                    )}
                </select>

                <select name="district" ref={register({ required: "Please fill in all required fields" })} onChange={e => { setDistrict(e.target.value) }}>
                    <option value=''>District</option>
                    {areaDistrict
                        .map((district, i) => {
                            return (
                                <option key={i} value={district.district}>{district.district}</option>
                            )
                        })
                    };
                </select>

                {districtChosen ?
                    <select name="area" ref={register({ required: true })}>
                        <option value=''>Area</option>
                        {districtChosen ?
                            districtChosen.area.map((area, i) => {
                                return (
                                    <option key={i} value={area.area}>{area.area}</option>
                                )
                            })
                            :
                            <div></div>
                        }
                    </select>
                    :
                    <div></div>
                }

                {/* building */}
                {/* block */}

                <select name="bedrooms" ref={register({ required: true })}>
                    <option value=''>Bedrooms</option>
                    {bedrooms
                        .map((beds, i) => {
                            return (
                                <option key={i} value={beds.bedrooms}>{beds.bedrooms}</option>
                            )
                        })
                    };
                </select>


                <select name="bathrooms" ref={register({ required: true })}>
                    <option value=''>Bathrooms</option>
                    {bathrooms
                        .map((baths, i) => {
                            return (
                                <option key={i} value={baths.bathrooms}>{baths.bathrooms}</option>
                            )
                        })
                    };
                </select>

                {/* storerooms */}
                {/* carParks */}

                <select name="floorLevel" ref={register({ required: true })}>
                    <option value=''>Floor Level</option>
                    {floorLevel
                        .map((level, i) => {
                            return (
                                <option key={i} value={level.level}>{level.level}</option>
                            )
                        })
                    };
                </select>

                <input type="submit" />
            </form>

        </div>
    )
};



export default ListApartment;