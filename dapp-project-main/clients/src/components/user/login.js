import React, { useState } from 'react';
import '../css/login.css';
import logo from '../image/logo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);

      // Reset the form fields
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const login = async (email, password) => {

    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:4002/studentVault/v1/users/login',
        data: {
          email,
          password,
        }
      })
      console.log(response)
      // alert(response.data.token)
      if (response.data.status === 'Success') {
        alert("Success loggin in")
        // toast.success("Login successfull", toastOption)
        Cookies.set('jwt', response.data.token, { expires: 7000, path: '/' });
        setTimeout(() => {
          navigate("/admin");
        }, 3000);


      }
    } catch (err) {
      console.log(err.message)
      alert("Login failed : Check password and email")
      console.error("Login failed : Check password and email")
    }

  };


  return (
    <>
      <div className='login-form-container'>
        <form onSubmit={handleSubmit} className="login-form">
          <div className='header'>
            <h1 className='tittle'>
              <img src={logo} className="logo" alt='logo' height={100} />
              <span className='student text-light'>STUDENT</span>
              <span className='vault'>VAULT</span>
            </h1>
            <h3 className='mt-3'>Login</h3>
          </div>
          <div className='form-group'>
            <input type="email" className='login-input' value={email} onChange={handleEmailChange} placeholder='Email' />
          </div>
          <div className='form-group'>
            <input type="password" className='login-input' value={password} onChange={handlePasswordChange} placeholder='Password' />
          </div>
          <div className='login-btn-container'>
            <button type="submit">Login</button>
          </div>
          <p>
            Forgot Password?<Link to="/reset"><span className='here mx-2 text-decoration-underline'>Click here</span>
            </Link>
          </p>
        </form>
      </div>
    </>

  );
}

export default LoginPage;
