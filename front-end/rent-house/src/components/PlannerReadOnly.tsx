import React from 'react';
import { Planner } from '../planner/renderer';
import '../scss/PlannerReadOnly.scss';





const PlannerReadOnly: React.FC = () => {



    return (
        <div className="planner" >
            <Planner />
        </div>
    )
}

export default PlannerReadOnly