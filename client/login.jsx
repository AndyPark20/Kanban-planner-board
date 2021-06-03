import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const HomeEntry = () => {

  const [userName, updateUserName] = useState('');

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="type-column d-flex flex-column">
          <label className="title-margin">UserName:</label>
            <input name="username" className="input-width" type="text"></input>
        </div>
        <div className="type-column d-flex flex-column mt-5">
          <label className="title-margin">Password:</label>
          <input name="password" className="input-width" type="password"></input>
        </div>
      </div>
    </div>
  );
};

export default HomeEntry;
