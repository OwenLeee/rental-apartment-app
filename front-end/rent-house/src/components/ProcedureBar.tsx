import React from 'react';
interface IBarProps {
   procedure:string;
};

const ProcedureBar: React.FC<IBarProps> = (props) => {
    const barNames:string[] = ["Map", "Details", "Photos", "Video", "Floor Planner"]


    return (
        <div className="procedure-buttons-wrap">
                
    {barNames.map(barName => <>
    <div className={props.procedure===barName?"procedure-buttons light": "procedure-buttons"}>{barName}</div>
    <div className={barName==="Floor Planner" ? "" : "line"}></div>
    </> )}


                {/* <div className="procedure-buttons">Floor Planner</div>
                <div className="line"></div>

                <div className="procedure-buttons">Photos</div>
                <div className="line"></div>

                <div className="procedure-buttons">Video</div>
                <div className="line"></div>
                <div className="procedure-buttons">Detail</div>
                <div className="line"></div>
                <div className="procedure-buttons">Map</div> */}
         </div>
    )
};



export default ProcedureBar;