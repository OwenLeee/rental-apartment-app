import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getBeds, getBaths } from '../redux/referenceTable/thunk';
import { IRootState } from '../redux/store';


interface IForm {
    bedrooms: string;
    bathrooms: string;
    storerooms: string; // remember to return boolean when inserting into database
    carParks: string; // remember to return boolean when inserting into database
    furniture: string; // remember to return boolean when inserting into database
    rentalPeriod: number;
}

const PartOneForm: React.FC = () => {

    const { register, handleSubmit } = useForm<IForm>();
    const onSubmit = (data: IForm) => {
        console.log({
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            storerooms: data.storerooms,
            carParks: data.carParks,
            furniture: data.furniture,
            rentalPeriod: data.rentalPeriod
        })
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBeds());
        dispatch(getBaths());
    }, [dispatch]);

    const bedrooms = useSelector((state: IRootState) => state.referenceTable.bedrooms);
    const bathrooms = useSelector((state: IRootState) => state.referenceTable.bathrooms);


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="bedrooms" ref={register({ required: true })}>
                    <option value=''>Bedrooms</option>
                    {bedrooms
                        .map(beds => {
                            return (
                                <option key={beds.id} value={beds.bedrooms}>{beds.bedrooms}</option>
                            )
                        })
                    }
                </select>


                <select name="bathrooms" ref={register({ required: true })}>
                    <option value=''>Bathrooms</option>
                    {bathrooms
                        .map(baths => {
                            return (
                                <option key={baths.id} value={baths.bathrooms}>{baths.bathrooms}</option>
                            )
                        })
                    }
                </select>

                <select name="storerooms" ref={register({ required: true })}>
                    <option value=''>Storerooms</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                </select>

                <select name="carParks" ref={register({ required: true })}>
                    <option value=''>Car parks</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                </select>


                <select name="furniture" ref={register({ required: true })}>
                    <option value=''>Furniture</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                </select>


                {/* rental period */}
                <input type="number" placeholder="Rental period (years)"
                    name="rentalPeriod" ref={register({ required: true })} />

                <input type="submit" />
            </form>
        </div >
    )
}


export default PartOneForm;
