import React, { Fragment,useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import logo from '../image/logo.jpg';
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import '../css/navBar.css';
export default function NavBar() {
    const [scrollBackground, setScrollBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 0) {
                setScrollBackground(true);
            } else {
                setScrollBackground(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <Fragment>
            <div className={`navbar-container ${scrollBackground ? 'scroll-background' : ''}`}>
                <input type="checkbox" id="showNav" />
                <div className="container nav-bar-items">
                    <div className='logo-home'>
                        <img src={logo} className="logo" alt='logo' height={50} />
                        <span className='student'>STUDENT</span>
                        <span className='vault'>VAULT</span>
                    </div>
                    <div className='navbar'>
                        <ul className='link'>
                            <li><Link to="/" className="nav-link">HOME</Link></li>
                            <li><Link to="/CCA" className="nav-link">CCA</Link></li>
                            <li><Link to="/about" className="nav-link">ABOUT US</Link></li>
                            <li><Link to="/login" className="nav-link"><button className="login-button">Login</button></Link></li>
                        </ul>
                    </div>
                    <div className="menu-container">
                        <label htmlFor="showNav">
                            <Icon icon="ic:round-menu" className="nav-menu" />
                        </label>
                    </div>
                </div>
                <div className="mini-nav">
                    <ul className='mini-link container'>
                        <li><a href="#home" className="nav-link">HOME</a></li>
                        <li><a href="#mycca" className="nav-link">MYCCA</a></li>
                        <li><a href="#about" className="nav-link">ABOUT US</a></li>
                        <li><a href="#login" className="nav-link"><button className="login-button">Login</button></a></li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}