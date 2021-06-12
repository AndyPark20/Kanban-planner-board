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
    <div>
      <form onSubmit={handleSubmit}>
        <label>FirstName:
      <input type="text" value={firstName} onChange={handleChange}></input>
        </label>
        <label>
          <input type="text" value={lastName} onChange={handleChange}></input>
        </label>
      </form>
    </div>
  );

};

export default signUp;
