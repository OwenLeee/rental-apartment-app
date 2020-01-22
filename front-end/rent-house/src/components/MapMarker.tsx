import React from 'react';
import NumberFormat from 'react-number-format';
import '../scss/MapMarker.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';



const Marker = (props: any) => {

  const dispatch = useDispatch(); 
  const { color, name, price , id} = props;
  return (
    <div>
      <div style={{ width: "150px" }}  >
        <p className="priceTag p-1">
          {name} <br/> 
          <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
        </p>
      </div>

      <div
        className="pin bounce"
        onClick={() => dispatch(push(`/rent/content/${id}`))}
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
      />
      <div className="pulse" />

    </div>
  );
};

export default Marker;


