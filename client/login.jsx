
import React, { useState, useEffect } from 'react';

const HomeEntry = () => {

  const [userName, updateUserName] = useState('');
  const [passWord, updatePassWord] = useState('');
  const [erroruserNameLogin, updateuserNameLogIn] = useState('Username:');
  const [errorPassword, updateErrorPassword] = useState('Password:');
  const [errorStatus, updateErrorStatus] = useState(false);

  const logIn = async e => {
    const credentials = { username: userName, password: passWord };
    if (!userName) {
      updateErrorStatus(true);
      updateuserNameLogIn('Username Empty!');
      updateErrorPassword(true);
      updateErrorPassword('Password Empty!');
    } else {
      try {
        const result = await fetch('/api/logIn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        // another promise
        const response = await result.json();
        if (response === 'Welcome') {
          location.hash = 'Home';
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmituserName = e => {
    updateUserName(e.target.value);
    if (e.target.value) {
      updateuserNameLogIn('Username:');
      updateErrorStatus(false);
    }
  };

  const handleSubmitPassWord = e => {
    updatePassWord(e.target.value);
    if (e.target.value) {
      updateErrorPassword('Password:');
      updateErrorStatus(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  // Error Red border for user name
  const errorUserNameborder = () => {
    if (erroruserNameLogin && errorStatus) {
      return 'input-width border-error';
    }
    return 'input-width';
  };

  // Red font color for user name
  const errorCredentialRed = () => {
    if (erroruserNameLogin && errorStatus) {
      return 'title-margin font-error';
    }
    return 'title-margin';
  };

  const signUp = () => {
    location.hash = 'signup';
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="type-column d-flex flex-column ">
          <form onSubmit={handleSubmit}>
            <label className={errorCredentialRed()}>{erroruserNameLogin}</label>
            <input name="username" className={errorUserNameborder()} type="text" value={userName} onChange={e => handleSubmituserName(e)}></input>
            <div className="pt-2">
              <label className={errorCredentialRed()}>{errorPassword}</label>
              <input name="password" className={errorUserNameborder()} type="password" value={passWord} onChange={e => handleSubmitPassWord(e)}></input>
            </div>
            <div className="text-right mt-5">
              <button type="button" className="btn btn-primary mr-2" onClick={signUp}>sign-up</button>
              <button type="submit" className="btn btn-success margin" onClick={e => logIn(e)}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default HomeEntry;
