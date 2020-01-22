import React from 'react';
import { Planner } from '../planner/renderer';
import '../scss/PlannerStyle.scss'
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../redux/store';
import { postFloorPlan } from '../redux/planner/thunk';
import ProcedureBar from './ProcedureBar';





const PlannerStyle: React.FC = () => {


    const rentalId = useSelector((state: IRootState) => state.listing.rentalId);
    const dispatch = useDispatch();

    const onHandleClick = () => {
        const json = localStorage.getItem('react-planner_v0');
        if (json) {
            dispatch(postFloorPlan(rentalId, json));
        }
    }


    return (
        <div className="planner-style">
            <ProcedureBar procedure="Floor Planner" />
            <Planner />
            <Button variant="secondary" onClick={() => onHandleClick()}>
                Submit
            </Button>
        </div>
    )
}

export default PlannerStyle