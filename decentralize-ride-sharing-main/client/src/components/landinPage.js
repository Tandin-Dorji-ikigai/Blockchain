
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';


import "./css/Landingpage.css";

function LandingPage() {




    return (
        <Fragment>
            <div className='landing-page'>
                <div className='landing-hero'>
                    <div className='landing-cta-container'>
                        <div className='nav-logo-container'>
                            <img src='images/LightLogo.jpeg' className='landing-logo' alt='logo' />
                            <div className='logo-name-container text-light'>RIDE <span>TRUST</span> </div>
                        </div>
                        <h1 className='landing-header'>Schedule your ride and travel</h1>
                        <Link to="/signupRedirect" className='mt-5 landing-get-started-button'>Get Started</Link>
                        <div className='mt-1 landing-already-have-acc'>
                            Already have an account?
                            <Link to="/login" className='landing-login-link'>
                                LOGIN
                            </Link>
                        </div>
                    </div>
                    <div className='oval-shape'>
                    </div>
                </div>

                <div className='container landing-contents'>
                    <h1 className='why-ridetrust'>
                        WHY RIDETRUST
                    </h1>
                    <div className='landing-card-container'>
                        <div className='landing-card-1'>
                            <div className='user-friendly-exp'>
                                User-Friendly Experience
                            </div>
                            <div className='landing-card-content'>
                                RideTrust focuses on delivering a user-friendly experience. The  website is designed to be intuitive and easy to navigate allowing users to book rides seamlessly.
                            </div>
                        </div>
                        <div className='landing-card-2'>
                            <Icon icon="tabler:location-filled" className='landing-location-icon' width="200" />
                        </div>
                    </div>

                    <div className='landing-service-card'>
                        <div className='landing-card'>
                            <div>
                                <Icon icon="mdi:security-camera" width="100" className='landing-location-icon' />
                            </div>
                            <div className='user-friendly-exp'>
                                Enhanced Privacy and Security
                            </div>
                            <div className='landing-card-content'>
                                RideTrust uses blockchain technology to prioritize user privacy and security by distributing data across multiple nodes, reducing the risk of data breaches and unauthorized access. Smart contracts ensure secure transactions between riders and drivers.
                            </div>
                        </div>
                        <div className='landing-card'>
                            <div>
                                <Icon icon="material-symbols:generating-tokens-outline" width="100" className='landing-location-icon' />
                            </div>
                            <div className='user-friendly-exp'>
                                Lower Costs
                            </div>
                            <div className='landing-card-content'>
                                RideTrust offers cheaper rides by cutting out middlemen and reducing costs, which means riders can avoid high platform fees and surcharges.
                            </div>
                        </div>
                    </div>
                </div>

                <div className='landing-company-stats'>
                    <div className=' stats-of-company'>
                        <div className='company-stats'>
                            <h1>1</h1>
                            <div className='company-stats-name'>
                                Year Experience
                            </div>
                        </div>
                        <div className='company-stats'>
                            <h1>1</h1>
                            <div className='company-stats-name'>
                                Riders
                            </div>
                        </div>
                        <div className='company-stats'>
                            <h1>1</h1>
                            <div className='company-stats-name'>
                                Drivers
                            </div>
                        </div>
                    </div>
                </div>
                <div className='landin-hero-bottom'>
                    <div className='oval-shape-bottom'>
                    </div>
                    <div className='landing-hero-content-bottom'>
                        <div className='landing-cta'>
                            Join the thousands of riders and drivers who have already experienced the convenience and security of RideTrust
                        </div>
                        <Link to="/signupRedirect" className='mt-5 landing-get-started-button'>Get Started</Link>
                        <div className='mt-1 landing-already-have-acc mt-3'>
                            Already have an account?
                            <Link to="/login" className='landing-login-link'>
                                LOGIN
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}


export default LandingPage;

