import React from 'react';

const Background = ({ status }) => {

  const test = () => {
    console.log('hello');
  };

  return (
    <div className="container modalPosition">
      <div className="rowModal">
        <div className="column">
          <form className="airportForm d-flex flex-column" >
            <label className="labelStyle"> Airport Code:</label>
            <input className="inputStyle" type="text" name="airportCode" placeholder="KSNA=John Wayne Airport" required></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Background;
