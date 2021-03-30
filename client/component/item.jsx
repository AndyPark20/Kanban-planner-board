import React from 'react';

const Item = ({ values }) => {

  return (

    <div className="card spacing" draggable>
      {/* <img className="card-img-top" src={values.img} alt="Card image cap" /> */}
      <div className="card-body">
        <h5 className="card-title">{values.name}</h5>
      </div>
    </div>
  );
};

export default Item;
