import React from 'react';
import '../scss/MapMarker.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const Marker = (props: any) => {
  const { color, name } = props;
  return (
    <div>
      <div style={{ width: "200px" }}>
      </div>

      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
      />
      <div className="pulse" />

    </div>
  );
};

export default Marker;


