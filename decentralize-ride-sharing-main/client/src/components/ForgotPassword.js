import React, { Fragment, useState } from "react";

import "./css/ForgotPassword.css"
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const toastOption = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await Axios({
                method: 'POST',
                url: `https://dashboard.render.com/api/v1/users/forgot-password`,
                data: { email: email }
            });
            console.log(response.data);
            if (response.data.success) {
                toast.success("Check your email to reset password", toastOption);
                setTimeout(() => {
                    navigate("/login");
                }, 4000);
            }
        } catch (err) {
            toast.error("Email Not Registered!", toastOption);
        }
    };


    return (
        <>
            <ToastContainer />
            <Fragment>
                <div className="forgot-form-container">
                    <form className="forgot-password-form">
                        <h3 className="forgot-text">
                            Forgot Password
                        </h3>
                        <div className="form-group mb-2 mt-5">
                            <label htmlFor="exampleInputPassword1">Enter Your Email Address</label>
                            <input
                                type="email"
                                className="form-control mt-2"
                                id="exampleInputPassword1"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {/* {emailFound && (
                                <small className="text-danger mt-3">Email not registered</small>
                            )} */}
                        </div>
                        <div className="form-group mt-4">
                            <button type="submit" className="forgot-submit-btn" onClick={handleSubmit} >
                                submit
                            </button>
                        </div>
                    </form>
                </div>
            </Fragment>
        </>
    )
}