import React, { useState } from 'react';

const Background = ({ status, searchValue }) => {
  const [keyWord, keyWordUpdate] = useState('');

  const modalUpdate = () => {
    if (!status) {
      return 'container modalPosition hidden';
    }
    return 'container modalPosition';
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={modalUpdate()}>
      <div className="rowModal">
        <div className="column">
          <form className="airportForm d-flex flex-column" onSubmit={e => handleSubmit(e)}>
            <label className="labelStyle"> Category:</label>
            <input className="inputStyle" type="text" name="airportCode" placeholder="ocean" onKeyUp={e => { keyWordUpdate(e.target.value); }} required></input>
            <button type="click" className="btn btn-primary btnSize" onClick={e => searchValue(e, keyWord)}>submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Background;
