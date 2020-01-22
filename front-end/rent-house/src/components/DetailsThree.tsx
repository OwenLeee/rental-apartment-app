import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../redux/store';
import { postDetailsThree } from '../redux/listing/thunk';
import ProcedureBar from './ProcedureBar';
import '../scss/DetailsThree.scss';

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
                 <ProcedureBar procedure="Details"/>
                 <div className="details-three">
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="number" placeholder="Saleable Area" name="saleableArea" ref={register({ required: true })} />
                <input type="number" placeholder="Gross Floor Area" name="grossFloorArea" ref={register({ required: true })} />
                <input type="number" placeholder="Monthly Rental" name="monthlyRental" ref={register({ required: true })} />
                <input type="number" placeholder="Deposit" name="deposit" ref={register({ required: true })} />
                <input type="text" placeholder="Title" name="title" ref={register({ required: true })} />
                <textarea name="description" ref={register({ required: true })} />

                <input type="submit" className="next-button" />
            </form>
            <img src={require(`../background_photos/bedroom.jpg`)} alt="icon" />
            </div>
        </div >
    )
}


export default DetailsThree;
