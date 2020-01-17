import React from 'react';
import { Planner } from '../planner/renderer';
import '../scss/Planner.scss'


const PlannerStyle: React.FC = () => {
    return (
        <div className="planner">
            <Planner />
        </div>
    )
}

export default PlannerStyle