import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function RegisterRedirect() {
    return (
        <>
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
                    
                </div>
                <div className="redirect-content-container">
                    <div className="signup-as-company">
                        Sign up for  <div className='logo-name-container' style={{ color: "#000" }}>RIDE <span>TRUST</span> </div> as
                    </div>
                    <div className="redirect-button-container">
                        <div>
                            <Link to='/driverSignup' className="redirect-btn">
                                <div className="user-driver">
                                    Driver
                                </div>
                                <Icon icon="material-symbols:arrow-forward-rounded" className="redirect-icon" />
                            </Link>
                        </div>
                        <div>
                            <Link to='/signup' className="redirect-btn">
                                <div className="user-rider">
                                    Rider
                                </div>
                                <Icon icon="material-symbols:arrow-forward-rounded" className="redirect-icon" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
