import React from 'react';
import '../scss/MapMarker.scss';
// import { FaBlackTie } from 'react-icons/fa';

const Marker = (props: any) => {
    const { color, name, id } = props;
    return (
      <div>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
        <div className="pulse" />
        <div className="tooltip"> <span className="tooltiptext">{name}</span> </div>
      </div>
    );
  }; 

  export default Marker;


 