import React from 'react';

const Item = ({ values }) => {

  return (
    // <div draggable>
    //   <img className="pictureCustom" src={values.img} alt="dogs" />
    // </div>
    <div className="card" draggable>
      <img className="card-img-top" src={values.img} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
};

export default Item;

{ /* <div className="card" style="width: 18rem;">
  <img className="card-img-top" src="..." alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div> */ }
