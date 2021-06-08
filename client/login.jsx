import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const HomeEntry = () => {

  const [userName, updateUserName] = useState('');

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="type-column d-flex flex-column border border-danger">
          <form>
            <label className="title-margin">UserName:</label>
            <input name="username" className="input-width" type="text"></input>
            <div className="pt-2">
              <label className="title-margin">Password:</label>
              <input name="password" className="input-width" type="password"></input>
            </div>
            <div className="text-right">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default HomeEntry;
