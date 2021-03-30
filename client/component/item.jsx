import React from 'react';

const Item = () => {

  return (
    <div className="card spacing cardStyle" draggable>
      {/* <img className="card-img-top" src={values.img} alt="Card image cap" /> */}
      <div className="card-body">
      <input type="text" placeholder="Enter a title for this card" className="titleEnter"></input>
      </div>
    </div>
  );
};

export default Item;
