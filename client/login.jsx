
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const HomeEntry = ({ logout }) => {
  const [userName, updateUserName] = useState('');
  const [passWord, updatePassWord] = useState('');
  const [erroruserNameLogin, updateuserNameLogIn] = useState('Username:');
  const [errorPassword, updateErrorPassword] = useState('Password:');
  const [errorStatus, updateErrorStatus] = useState(false);
  const [passwordError, updatePasswordError] = useState(false);

  const logIn = async e => {
    const credentials = { username: userName, password: passWord };
    if (!userName && passWord) {
      updateErrorStatus(true);
      updateuserNameLogIn('Username Empty!');
    } else if (userName && !passWord) {
      updatePasswordError(true);
      updateErrorPassword('Password Empty!');
    } else if (!userName && !passWord) {
      updatePasswordError(true);
      updateErrorPassword('Password Empty!');
      updateErrorStatus(true);
      updateuserNameLogIn('Username Empty!');
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
        if (response) {
          localStorage.setItem('token', JSON.stringify(response.token));
          location.hash = 'Home';
        }
      } catch (err) {
        console.error(err);
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
      updatePasswordError(false);
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

  // Error Red border for password
  const errorPassWordBorder = () => {
    if (errorPassword && passwordError) {
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

  // Red font color for password
  const errorPassWordRed = () => {
    if (errorPassword && passwordError) {
      return 'title-margin font-error';
    }
    return 'title-margin';
  };

  const signUp = () => {
    location.hash = 'signup';
  };

  // render logout status
  const renderStatus = () => {
    if (logout) {
      return 'Successfully Logged Out!';
    }
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="title d-flex justify-content-center align-items-center mb-5">
          <img className="logo-size" src='/images/kanban.png' alt="kanban logo" />
          <div className="title-font ml-3">
            <h3>Kanban Planner</h3>
            <h3>Board</h3>
          </div>
        </div>
        <div className="type-column d-flex flex-column mt-5">
          <form onSubmit={handleSubmit}>
            <p className="login-status">{renderStatus()}</p>
            <label htmlFor="username" className={errorCredentialRed()}>{erroruserNameLogin}</label>
            <input name="username" className={errorUserNameborder()} type="text" value={userName} onChange={e => handleSubmituserName(e)}></input>
            <div className="pt-2">
              <label htmlFor="password" className={errorPassWordRed()}>{errorPassword}</label>
              <input name="password" className={errorPassWordBorder()} type="password" value={passWord} onChange={e => handleSubmitPassWord(e)}></input>
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
