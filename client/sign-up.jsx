import React, { useState, useEffect } from 'react';

const signUp = () => {

  const [firstName, updateFirstName] = useState('');
  const [lastName, updateLastName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  };

  function handleChange(e) {
    updateFirstName(e.target.value);
  }

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center">
        <div className="type-column d-flex flex-column align-items-center">
          <form onSubmit={handleSubmit} className="d-flex flex-column w-50">
            {/* Firstname */}
            <label htmlFor="firstname">Firstname:</label>
            <input type="text" name="firstname" value={firstName} onChange={handleChange}></input>
            {/* lastname */}
            <label htmlFor="lastname" className="mt-2">Lastname:</label>
            <input name="lastname" type="text" value={lastName} onChange={handleChange}></input>
            {/* Username */}
            <label htmlFor="userName" className="mt-2">Username:</label>
            <input name="userName" type="text"></input>
            {/* Password */}
            <label htmlFor="password" className="mt-2">Password:</label>
            <input name="password" type="password"></input>
            {/* re-enter password */}
            <label htmlFor="password" className="mt-2">Confirm Password:</label>
            <input name="password" type="password"></input>
            <div name="userName" className="mt-2 d-flex justify-content-end custom-margin">
              <button name="lastname" type="submit" className="btn btn-success" onClick={e => logIn(e)}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signUp;
