
import React, { useState, useEffect } from 'react';

const HomeEntry = () => {

  const [userName, updateUserName] = useState('');
  const [passWord, updatePassWord] = useState('');
  const [errorLogin, updateErrorLogIn] = useState('');

  const logIn = async e => {
    const credentials = { username: userName, password: passWord };
    if (!userName) {
      updateErrorLogIn('Username empty!');
    }
    // try {
    //   const result = await fetch('/api/logIn', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    //   });
    //   // another promise
    //   const response = await result.json();
    //   console.log('result', response);
    //   if (response === 'Welcome') {
    //     location.hash = 'Home';
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

  };

  const handleSubmituserName = e => {
    updateUserName(e.target.value);
  };

  const handleSubmitPassWord = e => {
    updatePassWord(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const errorBorder = () => {
    if (errorLogin === 'Username empty!') {
      return 'input-width';
    }
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <h3 className="text-center">{errorLogin}</h3>
        <div className="type-column d-flex flex-column ">
          <form onSubmit={handleSubmit}>
            <label className="title-margin">UserName:</label>
            <input name="username" className={errorBorder} type="text" value={userName} onChange={e => handleSubmituserName(e)} required></input>
            <div className="pt-2">
              <label className="title-margin">Password:</label>
              <input name="password" className="input-width" type="password" value={passWord} onChange={e => handleSubmitPassWord(e)} required></input>
            </div>
            <div className="text-right mt-5">
              <button type="button" className="btn btn-primary mr-2">sign-up</button>
              <button type="submit" className="btn btn-success margin" onClick={e => logIn(e)}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default HomeEntry;
