import React from 'react';
import logo from '../image/logo.jpg';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='email'>
                <ul className='information'>
                    <img src={logo} className="logo" alt='logo' height={50} />
                    <span className='student text-light'>STUDENT</span>
                    <span className='vault'>VAULT</span>
                    <li>Email: studentvault@gmail.com</li>
                    <li>Address: Gyalpozhing, Mongar</li>
                    <li>Telephone: 975+17#######</li>
                </ul>
            </div>
            <div className='quicklinks'>
                <span>QUICK LINKS</span >
                <ul className='q-links'>
                    <li><a href="#ims" className='f-link'>IMS RUB</a></li>
                    <li><a href="#moea "className='f-link'>MoEA</a></li>
                    <li><a href="#gcit" className='f-link'>GCIT</a></li>
                </ul>
            </div>
            <div className='navigation'>
                <span>NAVIGATIONS</span>
                <ul className='_navigation'>
                    <li><Link to="/" className='f-link'>HOME</Link></li>
                    <li><Link to="/" className='f-link'>MYCCA</Link></li>
                    <li><Link to="/" className='f-link'>ABOUT US</Link></li>
                </ul>
            </div>
            <div className='social-media'>
                <span>SOCIAL MEDIAS</span>
                <ul className='social'>
                    <li><a href="https://www.instagram.com" ><FaInstagram size={30} className='f-link'/></a></li>
                    <li><a href="https://twitter.com"><FaTwitter size={30} className='f-link'/></a></li>
                    <li><a href="https://www.facebook.com"><FaFacebook size={30}className='f-link' /></a></li>
                    <li><a href="https://www.youtube.com"><FaYoutube size={30} className='f-link'/></a></li>
                </ul>
            </div>
            <div className='end'>
                <span className='copy'>Copyright@2023StudentVault</span>
            </div>
        </div>
    )
}