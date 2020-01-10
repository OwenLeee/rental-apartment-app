import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import '../scss/ProcedureBar.scss';

interface IListApartmentProps {

}

const ListApartment: React.FC<IListApartmentProps> = (props: IListApartmentProps) => {



    return (
        <div>
            <div className="procedure-buttons-wrap">
                <div className="procedure-buttons">Floor Planner</div>
                <div className="procedure-buttons">Photos</div>
                <div className="procedure-buttons">Video</div>
                <div className="procedure-buttons">Detail</div>
                <div className="procedure-buttons">Map</div>
            </div>
            <div>
                <Switch>
                    {/* <Route path="/" exact={true} component={Home} />
                    <Route path="/scores" component={Scores} />
                    <Route path="/board" component={Board} />
                    <Route path="/about" component={About} />
                    <Route component={NoMatch} /> */}
                </Switch>
            </div>
        </div>
    )
};

export default ListApartment;