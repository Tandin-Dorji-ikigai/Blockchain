import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

function Footer() {

    //scroll to top when clicking on link
    function scroolToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <Fragment>
            <div className='footer'>
                <div className=' footer-container'>
                    <div className='footer-logo-container'>
                        <img src='/images/LightLogo.jpeg' alt='footer Logo' className='footerLogo' />
                        <div className='logo-name footer-logo-name'>
                            Ride<span>Trust</span>
                        </div>
                    </div>
                    <div className='footer-link-container'>
                        <Link to='/ridetrust/contact' className='flink'>
                            Contact Us
                        </Link>
                        <Link to='/ridetrust/community' className='flink'>
                            Community
                        </Link>
                        <Link to='/ridetrust/about' className='flink'>
                            About Us
                        </Link>
                    </div>
                    <div className='copyright-container'>
                        © RideTrust, Inc. 2023. We love our users!
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default Footer;