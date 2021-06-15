
import React, { useState, useEffect } from 'react';

const signUp = () => {
  // For the input Titles
  const [userInfo, updateUserInfo] = useState({ firstname: '', lastname: '', userName: '', password: '', confirmPassword: '' });
  const [firstname, updateFirstName] = useState('Firstname:');
  const [lastName, updateLastName] = useState('Lastname:');
  const [userName, updateUserName] = useState('Username:');
  const [password, updatePassword] = useState('Password:');
  const [statusCheck, updateStatusCheck] = useState('');

  // For Red box and font control
  const [confirmPassword, updateConfirmPassword] = useState('Confirm Password:');
  const [firstNameStatus, updateFirstNameStatus] = useState(false);
  const [lastNameStatus, updateLastNameStatus] = useState(false);
  const [usernameStatus, updateUserNameStatus] = useState(false);
  const [passwordStatus, updatePassWordStatus] = useState(false);
  const [confirmPasswordStatus, updateConfirmPasswordStatus] = useState(false);
  const [titleStatus, updateTitleStatus] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
  };

  function handleChange(e) {
    const name = e.target.name;
    const input = e.target.value;
    updateUserInfo({ ...userInfo, [name]: input });

    // Values for the input
    if (name === 'firstname') {
      updateFirstNameStatus(false);
      updateFirstName('Firstname:');
    }

    if (name === 'lastname') {
      updateLastNameStatus(false);
      updateLastName('Lastname:');
    }

    if (name === 'userName') {
      updateUserNameStatus(false);
      updateUserName('Username:');
    }

    if (name === 'password') {
      updateStatusCheck('');
      updateTitleStatus(false);
      updatePassWordStatus(false);
      updatePassword('Password:');
    }

    if (name === 'confirmPassword') {
      updateStatusCheck('');
      updateTitleStatus(false);
      updateConfirmPasswordStatus(false);
      updateConfirmPassword('Confirm Password:');
    }

  }

  const submitForm = async () => {
    if (!userInfo.firstname) {
      updateFirstName('Firstname Empty!');
      updateFirstNameStatus(true);
    }
    if (!userInfo.lastname) {
      updateLastName('Lastname Empty!');
      updateLastNameStatus(true);
    }
    if (!userInfo.userName) {
      updateUserName('Username Empty!');
      updateUserNameStatus(true);
    }
    if (!userInfo.password) {
      updatePassword('Password Empty!');
      updatePassWordStatus(true);
    }
    if (!userInfo.confirmPassword) {
      updateConfirmPassword('Password Empty!');
      updateConfirmPasswordStatus(true);
    }

    if (userInfo.firstname && userInfo.lastname && userInfo.userName && (userInfo.password === userInfo.confirmPassword)) {
      try {
        const sendSignUp = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        });
        const result = await sendSignUp.json();
        console.log(result);
      } catch (err) {
        console.error('ERR' + err);
      }
    } else if (userInfo.firstname && userInfo.lastname && userInfo.userName && (userInfo.password !== userInfo.confirmPassword)) {
      updateTitleStatus(true);
      updateStatusCheck('Password and confirm-password doesn\'t Match!');
    }

  };

  const status = () => {
    if (userInfo.firstname && userInfo.lastname && userInfo.userName && (userInfo.password === userInfo.confirmPassword) && !titleStatus) {
      return 'green';
    } else if (userInfo.firstname && userInfo.lastname && userInfo.userName && (userInfo.password !== userInfo.confirmPassword) && titleStatus) {
      return 'font-error';
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
        <div className="text-center">
          <h4 className={status()}>{statusCheck}</h4>
        </div>
        <div className="type-column d-flex flex-column align-items-center">
          <form onSubmit={handleSubmit} className="d-flex flex-column w-50">
            {/* Firstname */}
            <label htmlFor="firstname" className={firstNameStatus ? redFont() : 'mt-2'}>{firstname}</label>
            <input type="text" className={firstNameStatus ? redBox() : ''} name="firstname" value={userInfo.firstname} onChange={handleChange}></input>
            {/* lastname */}
            <label htmlFor="lastname" className={lastNameStatus ? redFont() : 'mt-2'}>{lastName}</label>
            <input name="lastname" className={lastNameStatus ? redBox() : ''} type="text" value={userInfo.lastname} onChange={handleChange}></input>
            {/* Username */}
            <label htmlFor="userName" className={usernameStatus ? redFont() : 'mt-2'}>{userName}</label>
            <input name="userName" type="text" className={usernameStatus ? redBox() : ''} value={userInfo.userName} onChange={handleChange}></input>
            {/* Password */}
            <label htmlFor="password" className={passwordStatus ? redFont() : 'mt-2'}>{password}</label>
            <input name="password" type="password" className={passwordStatus ? redBox() : ''} value={userInfo.password} onChange={handleChange}></input>
            {/* re-enter password */}
            <label htmlFor="confirmPassword" className={confirmPasswordStatus ? redFont() : 'mt-2'}>{confirmPassword}</label>
            <input name="confirmPassword" type="password" className={confirmPasswordStatus ? redBox() : ''} value={userInfo.confirmPassword} onChange={handleChange}></input>
            <div className="mt-2 d-flex justify-content-end custom-margin">
              <button name="lastname" type="submit" className="btn btn-danger mr-2" >Cancel</button>
              <button name="lastname" type="submit" className="btn btn-success" onClick={submitForm}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signUp;
