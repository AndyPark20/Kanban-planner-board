import React from 'react';

const Background = () => {

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
            <label className="labelStyle">Airport schedule start-time:</label>
            <input className="inputStyle" type="datetime-local" name="startTime" required></input>
            <label className="labelStyle">Airport schedule end-time:</label>
            <input className="inputStyle" type="datetime-local" name="endTime" required></input>
            <label className="labelStyle selectForm">  Departure or Arrival:
                <select name="dOrA" required>
                <option value="">Please Select</option>
                <option value="Arrival" >Arrival</option>
                <option value="Departure" >Departure</option>
              </select>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Background;
