import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const HomeEntry = () => {

  const [userName, updateUserName] = useState('');

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center text-center">
        <div className="type-column d-flex flex-column">
          <label>UserName:</label>
            <input name="username" className="input-width" type="text"></input>
        </div>
        <div className="type-column d-flex flex-column">
          <label>Password:</label>
          <input name="password" className="input-width" type="password"></input>
        </div>
      </div>
    </div>
  );
};

export default HomeEntry;
