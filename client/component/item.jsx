import React from 'react';

const Item = ({ values }) => {

  const fetchIt = () => {
    const ocean = 'Ocean';
    const land = 'landscape';
    const size = 'medium';
    fetch(`/api/picture/${ocean}/${land}/${size}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (

    <div className="card spacing" draggable>
      {/* <img className="card-img-top" src={values.img} alt="Card image cap" /> */}
      <div className="card-body">
        <h5 className="card-title">{values.name}</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" className="btn btn-primary" onClick={() => fetchIt()}>Go somewhere</a>
      </div>
    </div>
  );
};

export default Item;
