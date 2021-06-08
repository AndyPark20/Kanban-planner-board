import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const HomeEntry = () => {

  const [userName, updateUserName] = useState('');

  useEffect(() => {
    console.log('username', userName);
  });

  const handleSubmit = e => {
    updateUserName(e.target.value);
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="type-column d-flex flex-column ">
          <form>
            <label className="title-margin">UserName:</label>
            <input name="username" className="input-width" type="text" ></input>
            <div className="pt-2">
              <label className="title-margin">Password:</label>
              <input name="password" className="input-width" type="password" onChange={e => handleSubmit(e)}></input>
            </div>
            <div className="text-right mt-5">
              <button type="submit" className="btn btn-primary margin">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default HomeEntry;
