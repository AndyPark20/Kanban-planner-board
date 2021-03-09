import React from 'react';

const Item = ({ value, img }) => {

  return (
    <div >
      <img className="pictureCustom" src={img} alt="dog" />
    </div>
  );
};

export default Item;
