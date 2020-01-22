import React/*, { useState, useEffect }*/ from 'react';
interface IBarProps {
    procedure: string;
};

const ProcedureBar: React.FC<IBarProps> = (props) => {
    const barNames: string[] = ["Map", "Details", "Photos", "Video", "Floor Planner"]
    // const [status, setStatus] = useState<Array<{name:string, status:boolean}>>([]);

    // useEffect(()=>{
    //     setStatus([{ name: "Map", status: true }, 
    //     { name: "Details", status: false }, 
    //     { name: "Photos", status: false }, 
    //     { name: "Video", status: false }, 
    //     { name: "Floor Planner", status: false }])
    // },[]);
  
    // const setState = (barName:string) =>{
        

    // }


    return (
        <div className="procedure-buttons-wrap">

            {barNames.map(barName => <>
                <div className={props.procedure === barName ? "procedure-buttons light" : "procedure-buttons"}>{barName}</div>
                <div className={barName === "Floor Planner" ? "" : "line"}></div>
            </>)}
                   {/* {status.map(barName => <>
                {setState(barName.name)}
                <div className={barName.status === true ? "procedure-buttons light" : "procedure-buttons"}>{barName.name}</div>
                <div className={barName.name === "Floor Planner" ? "" : "line"}></div>
            </>)} */}


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