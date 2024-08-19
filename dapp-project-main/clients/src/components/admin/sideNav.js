import React, { Fragment } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/sideNav.css';
import Cookies from 'js-cookie';

import AdminTopNav from './admintopNav';

export default function AdminSideNav() {
    const navigate = useNavigate()
    const Logout = async () => {
        try {
            const response = await axios.get('http://localhost:4002/studentVault/v1/users/logout');
            console.log(response.data.status);
            if (response.data.status === 'Successfully Logged Out') {
                alert("Logout Successful")
                Cookies.remove('jwt'); // Remove the 'jwt' cookie
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <Fragment>
            <AdminTopNav />
            <div className='admin-contents d-flex'>
                <div className='side-nav-container'>
                    <ul className='side-nav-items-container'>
                        <li className='side-nav-items side-nav-header'>
                            MENU
                        </li>
                        <Link to="/admin" className='link-item'>
                            <li className='side-nav-items'>
                                Home
                            </li>
                        </Link>

                        <Link to="upload" className='link-item'>

                            <li className='side-nav-items'>
                                Upload Participants
                            </li>
                        </Link>
                        <Link to="view" className='link-item'>

                            <li className='side-nav-items'>
                                View CCA
                            </li>
                        </Link>
                        <Link to="profile" className='link-item'>

                            <li className='side-nav-items'>
                                Profile
                            </li>
                        </Link>
                        <Link className='link-item'>

                            <li className='side-nav-items' onClick={Logout}>
                                Logout
                            </li>
                        </Link>
                    </ul>
                </div>
                <Outlet />
            </div>
        </Fragment>
    );
}
