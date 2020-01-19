import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../redux/store';
import { postDetailsThree } from '../redux/listing/thunk';


interface IForm {
    saleableArea: number,
    grossFloorArea: number,
    monthlyRental: number,
    deposit: number,
    title: string,
    description: string
}

const DetailsThree: React.FC = () => {

    const rentalId = useSelector((state: IRootState) => state.listing.rentalId);
    const dispatch = useDispatch();


    const { register, handleSubmit } = useForm<IForm>();
    const onSubmit = (data: IForm) => {

        dispatch(postDetailsThree(rentalId, data.saleableArea, data.grossFloorArea,
            data.monthlyRental, data.deposit, data.title, data.description))
    };



    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="number" placeholder="saleableArea" name="saleableArea" ref={register({ required: true })} />
                <input type="number" placeholder="grossFloorArea" name="grossFloorArea" ref={register({ required: true })} />
                <input type="number" placeholder="monthlyRental" name="monthlyRental" ref={register({ required: true })} />
                <input type="number" placeholder="deposit" name="deposit" ref={register({ required: true })} />
                <input type="text" placeholder="title" name="title" ref={register({ required: true })} />
                <textarea name="description" ref={register({ required: true })} />

                <input type="submit" />

            </form>
        </div >
    )
}


export default DetailsThree;
