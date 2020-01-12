import React, { useEffect, useState } from 'react';
// import { Link, Switch, Route } from 'react-router-dom';
import '../scss/ProcedureBar.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, getDistrict } from '../redux/referenceTable/thunk';
import { IApartmentType } from '../redux/referenceTable/state';
import { IRootState } from '../redux/store';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';


interface IListApartmentProps {
    // apartmentType: IApartmentType[];

}

interface IForm {
    type: string;
    district: string;
    area: string;
};

const ListApartment: React.FC<IListApartmentProps> = (props) => {
    const [district, setDistrict] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<IForm>();
    const onSubmit = (data: IForm) => {
        console.log(data.type, data.district, data.area);
    }
    if (errors.area?.type) {
        console.log(errors.area?.type);
    }


    useEffect(() => {
        dispatch(getTypes());
        dispatch(getDistrict());
    }, [dispatch]);

    const apartmentType = useSelector((state: IRootState) => state.referenceTable.apartmentType)
    const areaDistrict = useSelector((state: IRootState) => state.referenceTable.areaDistrict)

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

            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="type" ref={register({ required: true })}>
                    {apartmentType.map(type => {
                        return (
                            <option value={type.house_type}>{type.house_type}</option>
                        );
                    }
                    )}

                </select>

                <select name="district" ref={register({ required: true })} onChange={e => { setDistrict(e.target.value) }}>
                    {areaDistrict
                        .map(district => {
                            return (
                                <option value={district.district}>{district.district}</option>
                            )
                        })
                    };
                </select>

                <select name="area" ref={register({ required: true })}>
                    {districtChosen ?
                        districtChosen.area.map(area => {
                            return (
                                <option value={area.area}>{area.area}</option>
                            )
                        })
                        :
                        districtChosen
                    };
                </select>
                
                {/* building */}
                {/* block */}

                



                <input type="submit" />
            </form>

        </div>
    )
};



export default ListApartment;