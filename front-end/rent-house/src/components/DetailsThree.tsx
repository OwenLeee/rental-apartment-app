import React from 'react';
import { useForm } from 'react-hook-form';


interface IForm {
    saleableArea: number,
    grossFloorArea: number,
    monthlyRental: number,
    deposit: number,
    title: string,
    description: string
}

const DetailsThree: React.FC = () => {

    const { register, handleSubmit } = useForm<IForm>();
    const onSubmit = (data: IForm) => {
        console.log({
            saleableArea: data.saleableArea,
            grossFloorArea: data.grossFloorArea,
            monthlyRental: data.monthlyRental,
            deposit: data.deposit,
            title: data.title,
            description: data.description
        })
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
