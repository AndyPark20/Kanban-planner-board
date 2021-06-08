import e from 'cors';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const HomeEntry = () => {

  const [userName, updateUserName] = useState('');
  const [passWord, updatePassWord] = useState('');

  const logIn = e => {
    e.preventDefault();

    fetch('/logIn')
      .then(res => {
        return res.json();
      });
  };

  const handleSubmit = e => {
    updateUserName(e.target.value);
    updatePassWord(e.target.value);
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="type-column d-flex flex-column ">
          <form onChange ={e => handleSubmit(e)}>
            <label className="title-margin">UserName:</label>
            <input name="username" className="input-width" type="text" values={userName} onChange={e => handleSubmit(e)}></input>
            <div className="pt-2">
              <label className="title-margin">Password:</label>
              <input name="password" className="input-width" type="password" values={passWord} onChange={e => handleSubmit(e)}></input>
            </div>
            <div className="text-right mt-5">
              <button type="submit" className="btn btn-primary margin" onClick={e => logIn(e)}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default HomeEntry;
