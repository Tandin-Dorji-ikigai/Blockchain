import React, { useState } from 'react';
import './css/password.css';

function Password() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleReset = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <form onSubmit={handleReset} className="password-form">
        <div className='header'>
            <h1 className='tittle'>
                Forgot Password
            </h1>
      </div>
      <div className='alert'>
        <p>Please create a password you don’t use on any other site</p>
      </div><br></br><br></br>
      <label>
        New Password:<br></br><br></br>
        <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
      </label>
      <br />
      <label>
        Confirm Password:<br></br><br></br>
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
      </label>
      <br />
      <button type="submit">Reset</button>
      <br />
    </form>
  );
}

export default Password;
