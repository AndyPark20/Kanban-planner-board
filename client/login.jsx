import e from 'cors';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const HomeEntry = () => {

  const [userName, updateUserName] = useState('');
  const [passWord, updatePassWord] = useState('');

  const logIn = async e => {
    const credentials = { username: userName, password: passWord };
    e.preventDefault();
    const result = await fetch('localhost:3000/logIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(credentials)

    });

  };

  const handleSubmituserName = e => {
    updateUserName(e.target.value);
    e.preventDefault();
  };

  const handleSubmitPassWord = e => {

    updatePassWord(e.target.value);
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="type-column d-flex flex-column ">
          <form >
            <label className="title-margin">UserName:</label>
            <input name="username" className="input-width" type="text" values={userName} onChange={e => handleSubmituserName(e)}></input>
            <div className="pt-2">
              <label className="title-margin">Password:</label>
              <input name="password" className="input-width" type="password" values={passWord} onChange={e => handleSubmitPassWord(e)}></input>
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
