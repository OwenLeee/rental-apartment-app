import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getBeds, getBaths } from '../redux/referenceTable/thunk';
import { IRootState } from '../redux/store';
import { postDetailsTwo } from '../redux/listing/thunk'



interface IForm {
    bedrooms: string;
    bathrooms: string;
    storerooms: boolean | string;
    carParks: boolean | string;
    furniture: boolean | string;
    rentalPeriod: number;
}

const DetailsTwo: React.FC = () => {

    const { register, handleSubmit } = useForm<IForm>();
    const onSubmit = (data: IForm) => {

        // dispatch(postDetailsTwo(bedroomsId, bathroomsId,
        //     isStoreroom, isCarpark, isFurniture, periodYears))

            
        console.log({
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            storerooms: data.storerooms === "on" ? true : false,
            carParks: data.carParks === "on" ? true : false,
            furniture: data.furniture === "on" ? true : false,
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


                <div>Storerooms</div>
                <input type="checkbox" placeholder="Storerooms" name="storerooms" ref={register} />


                <div>
                    <div>Car Park</div>
                    <input type="checkbox" placeholder="Car Park" name="carParks" ref={register} />

                </div>

                <div>
                    <div>Furniture</div>
                    <input type="checkbox" placeholder="Furniture" name="furniture" ref={register} />

                </div>



                {/* rental period */}
                <input type="number" placeholder="Rental period (years)"
                    name="rentalPeriod" ref={register({ required: true })} />

                <input type="submit" />
            </form>
        </div >
    )
}


export default DetailsTwo;
