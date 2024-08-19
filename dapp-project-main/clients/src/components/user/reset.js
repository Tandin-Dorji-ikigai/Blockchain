import React, { useState } from 'react';
import '../css/reset.css';



function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setError("Email Not Found!")
    setEmailFound(true)
  };

  const [error, setError] = useState("")

  const [emailFound, setEmailFound] = useState(false)


  return (
    <div className='reset-form-container'>
      <div className='reset-container'>
        <form onSubmit={handleReset} className="reset-form">
          <div className='tittle'>
            Forgot Password
          </div>
          {!emailFound && (
            <div>
              <label htmlFor="formGroupExampleInput" className="form-label">Enter Your Email</label>
              <input type="email" value={email} onChange={handleEmailChange} className="form-control reset-input" id="formGroupExampleInput" />
              <small className='reset-err'>{error}</small>
            </div>
          )}

          {emailFound && (
            <div>
              <div className='reset-header mb-3'>
                Please create a password you don’t use on any other site
              </div>
              <div className='mb-3'>
                <label htmlFor="formGroupExampleInput" className="form-label">New Password</label>
                <input type="password" className="form-control reset-input" id="formGroupExampleInput" />
              </div>
              <div >
                <label htmlFor="formGroupExampleInput" className="form-label">Confirm Password</label>
                <input type="password" className="form-control reset-input" id="formGroupExampleInput" />
                <small className='reset-err'>{error}</small>

              </div>
            </div>
          )}

          <button type="submit" className='reset-passowrd-btn'>Reset</button>
        </form>
      </div>

    </div>
  );
}

export default ResetPassword;
