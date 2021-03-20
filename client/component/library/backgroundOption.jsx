import React from 'react';

const Background = ({ status }) => {

  const modalUpdate = () => {
    if (!status) {
      return 'container modalPosition hidden';
    }
    return 'container modalPosition';
  };

  const modalContext = () => {
    if (!status) {
      return 'column hidden';
    }
    return 'airportForm d-flex flex-column';
  };

  return (
    <div className={modalUpdate()}>
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
