import React from 'react';

const Item = ({ values}) => {

  return (
    <div draggable>
      <img className="pictureCustom" src={values.img} alt="dogs" />
    </div>
  );
};

export default Item;
