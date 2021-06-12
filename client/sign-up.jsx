import { sign } from 'jsonwebtoken';
import React, { useState, useEffect } from 'react';

const signUp = () => {
  const [firstName, updateFirstName] = useState('');
  const [lastName, updateLastName] = useState('');
  const [username, updateUserName] = useState('');
  const [password, updatePassword] = useState('');
  const [confirmPassword, updateConfirmPassword] = useState('');

  let signUpObject = {};

  // useEffect(() => {
  //   console.log(signUpObject);
  // });

  const handleSubmit = e => {
    e.preventDefault();
  };

  function handleChange(e) {
    const name = e.target.name;
    const input = e.target.value;
    const newObject = { [name]: input };
    signUpObject = { ...newObject };
    console.log(signUpObject);
  }

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="type-column d-flex flex-column align-items-center">
          <form onSubmit={handleSubmit} className="d-flex flex-column w-50">
            {/* Firstname */}
            <label htmlFor="firstname">Firstname:</label>
            <input type="text" name="firstname" value={signUpObject.firstName} onChange={handleChange}></input>
            {/* lastname */}
            <label htmlFor="lastname" className="mt-2">Lastname:</label>
            <input name="lastname" type="text" value={signUpObject.firstName} onChange={handleChange}></input>
            {/* Username */}
            <label htmlFor="userName" className="mt-2">Username:</label>
            <input name="userName" type="text" value={username} onChange={handleChange}></input>
            {/* Password */}
            <label htmlFor="password" className="mt-2">Password:</label>
            <input name="password" type="password" value={password} onChange={handleChange}></input>
            {/* re-enter password */}
            <label htmlFor="password" className="mt-2">Confirm Password:</label>
            <input name="password" type="password" value={confirmPassword} onChange={handleChange}></input>
            <div name="userName" className="mt-2 d-flex justify-content-end custom-margin">
              <button name="lastname" type="submit" className="btn btn-success" >Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signUp;
