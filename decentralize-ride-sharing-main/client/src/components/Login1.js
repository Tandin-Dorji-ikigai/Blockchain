import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './css/login_SignUp.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';


export default function Login1(props) {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("")
  const toastOption = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await axios({
        method: 'POST',
        url: 'https://dashboard.render.com/api/v1/users/login',
        data: {
          phoneNumber,
          password,
        }
      })
      // alert(response.data.token)
      if (response.data.status === 'success') {
        // handleaccessPage(response.data.data.user.account)
        for (var i = 0; i < props.banMembers?.length; i++) {
          if (props.banMembers[i].userAddress === response.data.data.user.account && props.banMembers[i].banned) {
            toast.success("You Are In Banning Session", toastOption)
            setTimeout(() => {
              navigate("/")
            }, 3000);
            return
          }
        }
        props.handleLoggedInStatus(true)
        toast.success("Login successfull", toastOption)
        Cookies.set('jwt', response.data.token, { expires: 7000, path: '/' });
        console.log(response.data.data.user.role)

        // Example: Dispatch the custom event when cookies change
        document.dispatchEvent(new Event('myCookieEvent'));
        if (response.data.data.user.role === "rider") {
          setTimeout(() => {
            navigate("/ridetrust/home");
          }, 3000);
        } else {
          setTimeout(() => {
            navigate("/ridetrust/home");
          }, 3000);
        }
        // setTimeout(() => {
        //   navigate("/login");
        // }, 3000); 
      }
      // else {
      //   toast.error("Login failed : Check password and phonenumber", toastOption)
      // }
    } catch (err) {
      console.log(err)

      let errorMessage = 'An error occurred';

      if (err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error;
      }

      toast.error(errorMessage, toastOption);
    }

  }

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <div className="login-logo-container">
          <img
            src="images/DarkLogo.jpeg"
            alt=""
            className="login-logo"
          />

          <h2 className="login-logo-name">
            Ride<span>Trust</span>
          </h2>
          <p className="text-center " style={{ color: "#05497C" }}>
            Don't have account?{" "}
            <Link to="/signupRedirect" style={{ color: "#01D28E" }}>
              SignUp
            </Link>
          </p>
        </div>
        <div className="login-form-container">
          <form className="login-form">
            <h2 className="login-text">
              Login
            </h2>
            <div className="form-group mb-2">
              <label htmlFor="exampleInputPassword1">Phone Number</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                pattern="[+975]-[17|2|3|4|5|6|7|8|9]-[0-9]{6}"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to='/resetPassword'>
              <small className="forgot-password">Forgot Password?</small>
            </Link>
            <div className="form-group">
              <button onClick={(e) => handleSubmit(e)} type="submit" className="signup-button login-form-button" >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

