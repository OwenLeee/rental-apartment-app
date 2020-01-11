import React from 'react';
import { useForm } from 'react-hook-form';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { connect } from 'react-redux';


interface IFormProps {
}

interface IForm {

}

const Form: React.FC<IFormProps> = (props: IFormProps) => {
    const { register, handleSubmit } = useForm<IForm>();
    const onSubmit = (data: IForm) => {
        // props.listNewApartment(data.name);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <select name="Type" ref={register}>
                <option className="type" value="Private Housing Estates">Private Housing Estates</option>
                <option value="Village Houses">Village Houses</option>
                <option value="Serviced Apartments">Serviced Apartments</option>
                <option value="Partitioned Flats">Partitioned Flats</option>
            </select>
            <input type="submit" />
        </form>
    )
}

const mapStateToProps = (state: IRootState) => {
    return {

    }
}

const mapDispatchToProps = (thunkDispatch: ReduxThunkDispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form);