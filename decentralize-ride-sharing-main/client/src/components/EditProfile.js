import React, { Fragment, useState } from 'react';
import './css/Profile.css';
import './css/EditProfile.css';
import { Icon } from '@iconify/react';
import Footer from './footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export default function EditProfile(props) {
    const [profilePicture, setProfilePicture] = useState(null)
    const [userData, setUserData] = useState({
        phoneNumber: '',
        email: '',
        address: '',
        bio: '',
        facebook: '',
        instagram: '',
        country: '',
        dzongkhag: '',
        gewog: ''
    })
    const handleUserDataChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };
    const handleProfileImage = (e) => {
        e.preventDefault()
        setProfilePicture(e.target.files[0])
    }
    const toastOption = {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const handleSubmitButton = async (e) => {
        e.preventDefault()
        var updateProfileStatus;
        var updateUserData;
        if (profilePicture) {
            const token = Cookies.get('jwt');
            const formData = new FormData();
            formData.append('photo', profilePicture);
            const PRes = await axios({
                method: "PATCH",
                url: `https://dashboard.render.com/api/v1/users/updateMe`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            updateProfileStatus = PRes.data.status
        }
        const nonEmptyUserData = Object.fromEntries(
            Object.entries(userData).filter(([key, value]) => value !== '')
        );
        if (Object.keys(nonEmptyUserData).length !== 0) {
            const userRes = await axios({
                method: "PATCH",
                url: `https://dashboard.render.com/api/v1/users/${props.profile._id}`,
                data: {
                    nonEmptyUserData
                }
            })
            updateUserData = userRes.data.status
        }
        if (updateUserData === "success" && updateProfileStatus === "success") {
            alert("both")
            toast.success("Update Successfull", toastOption)
            setTimeout(() => {
                window.location.reload(true)
            }, 3000);
        } else if (updateProfileStatus === "success") {
            toast.success("profile Updated successfull ", toastOption)
            setTimeout(() => {
                window.location.reload(true)
            }, 3000);
        } else {
            toast.success("Data Updated successfull ", toastOption)
            setTimeout(() => {
                window.location.reload(true)
            }, 3000);
        }
    }
    function scroolToTop() {
        window.scrollTo(0, 0);
    }
    return (
        <Fragment>
            <ToastContainer />
            <div>
                <div className='profile-wrapper container'>
                    <div className='user-profile-imgbio-container imgbio-edit'>
                        <div>
                            <img src='images/userSquareLarge.png' alt='user' className='profile-user-img' />
                        </div>
                        <div className='user-profile-bio'>
                            <h4>Bio</h4>
                            <div className='profile-bio'>
                                {props.profile?.bio}
                            </div>
                        </div>
                    </div>
                    <div className='user-profile-detail-container'>
                        <div className='edit-profile-about'>
                            About
                        </div>
                        <div className='edit-profile-about-detail'>
                            Set your profile name and details. Your profile name and avatar represent you throughout RideTrust, and must be appropriate for all audiences.
                        </div>
                        <form>
                            <div className='user-profile-information'>
                                <div className='user-profile-info-header edit-info-general'>
                                    <Icon icon="mdi:user" />
                                    Avatar
                                </div>
                                <div className='user-profile-contact-info user-profile-contact-info-edit avatar-container'>
                                    <div className='contact-attribute-container contact-attriute-edit '>
                                        <span className='col contact-attribute'>Photo :</span>
                                    </div>
                                    <div className='contact-value-container-edit'>
                                        <div class="mb-3">
                                            <input className="form-control" type="file" name='photo' accept="image/*" onChange={(e) => handleProfileImage(e)} id="formFile" />
                                        </div>
                                    </div>
                                </div>
                                <div className='user-profile-info-header edit-info-general'>
                                    <Icon icon="mdi:user" />
                                    General
                                </div>
                                <div className='user-profile-contact-info user-profile-contact-info-edit '>
                                    <div className='contact-attribute-container contact-attriute-edit'>
                                        <span className='col contact-attribute'>Phone :</span>
                                        <span className='col contact-attribute'>Email :</span>
                                        <span className=' col contact-attribute'>Address :</span>
                                    </div>
                                    <div className='contact-value-container-edit'>
                                        <div className="col-md-12">
                                            <input type="number" placeholder={props.profile.phoneNumber} name='phoneNumber' value={userData.phoneNumber} onChange={(e) => handleUserDataChange(e)} className="form-control" id="phoneNo" />
                                        </div>
                                        <div className="col-md-12">
                                            <input name='email' placeholder={props.profile.email} value={userData.email} onChange={(e) => handleUserDataChange(e)} type="email" className="form-control" id="Email" />
                                        </div>
                                        <div className="col-md-12">
                                            <input name='address' placeholder={props.profile.address} value={userData.address} onChange={(e) => handleUserDataChange(e)} type="text" className="form-control" id="address" />
                                        </div>
                                    </div>
                                </div>

                                <div className='user-profile-info-header edit-info-location'>
                                    <Icon icon="mdi:user" />
                                    Location
                                </div>
                                <div className='user-profile-contact-info user-profile-contact-info-edit '>
                                    <div className='contact-attribute-container contact-attriute-edit'>
                                        <span className='col contact-attribute'>Country :</span>
                                        <span className='col contact-attribute'>Dzongkhag :</span>
                                        <span className=' col contact-attribute'>Gewong :</span>
                                    </div>
                                    <div className='contact-value-container-edit'>
                                        <div className="col-md-12">
                                            <input name='country' placeholder={props.profile.country} value={userData.country} onChange={(e) => handleUserDataChange(e)} type="text" className="form-control" id="phoneNo" />
                                        </div>
                                        <div className="col-md-12">
                                            <input name='dzongkhag' placeholder={props.profile.dzongkhag} value={userData.dzongkhag} onChange={(e) => handleUserDataChange(e)} type="email" className="form-control" id="Email" />
                                        </div>
                                        <div className="col-md-12">
                                            <input name='gewog' type="text" placeholder={props.profile.gewog} value={userData.gewog} onChange={(e) => handleUserDataChange(e)} className="form-control" id="address" />
                                        </div>
                                    </div>
                                </div>
                               
                                <div className='user-profile-info-header edit-info-bio'>
                                    <Icon icon="mdi:user" />
                                    Bio
                                </div>
                                <div className='user-profile-contact-info user-profile-contact-info-edit '>
                                    <div className='contact-attribute-container contact-attriute-edit'>
                                        <span className='col contact-attribute'>Bio :</span>
                                    </div>
                                    <div className='contact-value-container-edit'>
                                        <div className="col-md-12">
                                            <textarea placeholder={props.profile.bio} name='bio' value={userData.bio} onChange={(e) => handleUserDataChange(e)} className="form-control" rows="5"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className='user-profile-info-header edit-info-social'>
                                    <Icon icon="mdi:user" />
                                    Social
                                </div>
                                <div className='user-profile-contact-info user-profile-contact-info-edit '>
                                    <div className='contact-attribute-container contact-attriute-edit'>
                                        <span className='col contact-attribute'>Facebook :</span>
                                        <span className='col contact-attribute'>Instagram :</span>
                                        <span className='col contact-attribute'></span>
                                    </div>
                                    <div className='contact-value-container-edit'>
                                        <div className="col-md-12">
                                            <input
                                                name='facebook'
                                                placeholder={props.profile?.facebook || props.profile.facebook}
                                                value={userData.facebook}
                                                onChange={(e) => handleUserDataChange(e)}
                                                type="text"
                                                className="form-control"
                                                id="phoneNo"
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <input
                                                name="instagram"
                                                placeholder={props.profile?.instagram || props.profile.instagram}
                                                value={userData.instagram}
                                                onChange={(e) => handleUserDataChange(e)}
                                                type="email"
                                                className="form-control"
                                                id="Email"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='button-container edit-button'>
                                    <Link to='/ridetrust/profile' className='text-decoration-none' onClick={scroolToTop}>
                                        <button className='login-button profile-edit-profile' type='submit'>
                                            <Icon icon="material-symbols:cancel" className='save-profile-icon' />
                                            <div>
                                                Cancel
                                            </div>
                                        </button>
                                    </Link>
                                    <button onClick={(e) => handleSubmitButton(e)} className='signup-button profile-edit-profile' type='submit'>
                                        <Icon icon="ic:round-save-alt" className='save-profile-icon' />
                                        <div>
                                            Save
                                        </div>
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </Fragment>
    )
}
