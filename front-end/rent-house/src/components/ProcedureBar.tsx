import React from 'react';
// import { Link, Switch, Route } from 'react-router-dom';
import '../scss/ProcedureBar.scss';
import { useForm } from 'react-hook-form';


interface IListApartmentProps {

}

interface IForm {
    type: string;
};

const ListApartment: React.FC<IListApartmentProps> = (props: IListApartmentProps) => {

    const { register, handleSubmit } = useForm<IForm>();
    const onSubmit = (data: IForm) => {
        console.log(data.type)
        // props.listNewApartment(data.name);
    }

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
                <select name="type" ref={register}>
                    <option value="Private Housing Estates">Private Housing Estates</option>
                    <option value="Village Houses">Village Houses</option>
                    <option value="Serviced Apartments">Serviced Apartments</option>
                    <option value="Partitioned Flats">Partitioned Flats</option>
                </select>
                <input type="submit" />
            </form>
        </div>
    )
};

export default ListApartment;