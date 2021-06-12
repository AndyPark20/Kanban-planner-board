
import React, { useState, useEffect } from 'react';

const signUp = () => {
  const [userInfo, updateUserInfo] = useState({ firstname: '', lastname: '', userName: '', password: '', confirmPassword: '' });
  const [firstname, updateFirstName] = useState('Firstname:');
  const [lastName, updateLastName] = useState('Lastname:');
  const [userName, updateUserName] = useState('Username:');
  const [password, updatePassword] = useState('Password:');
  const [confirmPassword, updateConfirmPassword] = useState('Confirm Password:');

  const handleSubmit = e => {
    e.preventDefault();
  };

  function handleChange(e) {
    const name = e.target.name;
    const input = e.target.value;
    userInfo[name] = input;
    updateUserInfo(userInfo);

  }

  const submitForm = () => {
    if (firstname === 'Firstname:') {
      updateFirstName('Firstname Empty!');
    }
    if (lastName === 'Lastname:') {
      updateLastName('Lastname Empty!');
    }
  };

  const redBox = () => {
    return 'mt-2 border-error';
  };

  const redFont = () => {
    return 'mt-2 font-error';
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="type-column d-flex flex-column align-items-center">
          <form onSubmit={handleSubmit} className="d-flex flex-column w-50">
            {/* Firstname */}
            <label htmlFor="firstname" className={(firstname !== 'Firstname:') ? redFont() : 'mt-2'}>{firstname}</label>
            <input type="text" className={(firstname !== 'Firstname:') ? redBox() : '' } name="firstname" value={userInfo.firstName} onChange={handleChange}></input>
            {/* lastname */}
            <label htmlFor="lastname" className={(lastName !== 'Lastname:') ? redFont() : 'mt-2'}>{lastName}</label>
            <input name="lastname" className={(lastName !== 'Lastname:') ? redBox() : ''} type="text" value={userInfo.lastName} onChange={handleChange}></input>
            {/* Username */}
            <label htmlFor="userName" className="mt-2">{userName}</label>
            <input name="userName" type="text" value={userInfo.userName} onChange={handleChange}></input>
            {/* Password */}
            <label htmlFor="password" className="mt-2">{password}</label>
            <input name="password" type="password" value={userInfo.password} onChange={handleChange}></input>
            {/* re-enter password */}
            <label htmlFor="confirmPassword" className="mt-2">{confirmPassword}</label>
            <input name="confirmPassword" type="password" value={userInfo.confirmPassword} onChange={handleChange}></input>
            <div className="mt-2 d-flex justify-content-end custom-margin">
              <button name="lastname" type="submit" className="btn btn-success" onClick={submitForm}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signUp;
