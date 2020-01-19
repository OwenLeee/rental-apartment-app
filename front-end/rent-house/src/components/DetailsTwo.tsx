import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getBeds, getBaths } from '../redux/referenceTable/thunk';
import { IRootState } from '../redux/store';
import { postDetailsTwo } from '../redux/listing/thunk';



interface IForm {
    bedrooms: string;
    bathrooms: string;
    storerooms: boolean | string;
    carParks: boolean | string;
    furniture: boolean | string;
    rentalPeriod: number;
}

const DetailsTwo: React.FC = () => {
    const bedrooms = useSelector((state: IRootState) => state.referenceTable.bedrooms);
    const bathrooms = useSelector((state: IRootState) => state.referenceTable.bathrooms);
    const rentalId = useSelector((state: IRootState) => state.listing.rentalId);

    const { register, handleSubmit } = useForm<IForm>();
    const onSubmit = (data: IForm) => {


        const bedroomsId = (bedrooms.filter(bed => bed.bedrooms === data.bedrooms))[0].id;
        const bathroomsId = (bathrooms.filter(bath => bath.bathrooms === data.bathrooms))[0].id;
        let isStoreroom: boolean = data.storerooms === "on" ? true : false;
        let isCarPark: boolean = data.carParks === "on" ? true : false;
        let isFurniture: boolean = data.furniture === "on" ? true : false;

        dispatch(postDetailsTwo(rentalId, bedroomsId, bathroomsId, isStoreroom, isCarPark, isFurniture, data.rentalPeriod))

    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBeds());
        dispatch(getBaths());
    }, [dispatch]);



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
