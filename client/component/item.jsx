import React from 'react';

const Item = () => {

  const handleSubmit = e => {
    e.preventDefault();
  };

  const enterTitle = e => {
    if (e.key === 'Enter') {

    }
  };

  return (
    <div className="card spacing cardStyle" draggable>
      {/* <img className="card-img-top" src={values.img} alt="Card image cap" /> */}
      <h5 className="card-title">Hello</h5>
      <form onSubmit={e => handleSubmit(e)}>
          <input type="text" placeholder="Enter a title for this card" className="titleEnter" onKeyUp={e => enterTitle(e)}></input>
      </form>
    </div>
  );
};

export default Item;
