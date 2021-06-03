import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const HomeEntry = () => {

  const [userName, updateUserName] = useState('');

  return (
    <div className="container">
      <div className="row d-flex">
        <div className="col">
          <label>UserName:</label>
            <input name="username" className="input-width" type="text"></input>
        </div>
        <div className="col">
          <label>Password:</label>
          <input name="password" className="input-width" type="password"></input>
        </div>
      </div>
    </div>
  );
};

export default HomeEntry;
