import React, { Fragment, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { MutatingDots } from 'react-loader-spinner'
export default function AdminProfile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const password = {
        password: 'user1234',
        confirmPassword: 'user1234'
    };

    const uploadUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4002/studentVault/v1/users', {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                role: role,
                password: password.password,
                passwordConfirm: password.confirmPassword
            });
            console.log(response);
            if (response.data.status === 'Success') {
                alert('Uploaded user successfully!');
                window.location.reload();
            }
        } catch (err) {
            console.error('Upload failed:', err.message);
        }
    };

    const [userData, setUserData] = useState(null);

    const fetchData = async () => {
        try {
            const cookieValue = Cookies.get('jwt');
            const decodedToken = jwt.decode(cookieValue);
            const userId = decodedToken.id;
            const response = await axios.get(`http://localhost:4002/studentVault/v1/users/${userId}`);
            setUserData(response.data.data);
            setuName(response.data.data.name);
            setuEmail(response.data.data.email);
            setuPhoneNumber(response.data.data.phoneNumber);
        } catch (error) {
            console.error('Retrieving Failed: Error getting data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [profilePicture, setProfilePicture] = useState(null);

    console.log(profilePicture);

    const handleProfileImage = (e) => {
        e.preventDefault();
        setProfilePicture(e.target.files[0]);
    };

    const [uname, setuName] = useState("");
    const [uEmail, setuEmail] = useState("");
    const [uphoneNumber, setuPhoneNumber] = useState("");

    if (userData === null) {
        return (
            <div className='loader-container'>
                <MutatingDots
                    height="100"
                    width="100"
                    color="#4fa94d"
                    secondaryColor='#4fa94d'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (profilePicture !== null) {
            formData.append('name', uname);
            formData.append('phoneNumber', uphoneNumber);
            formData.append('email', uEmail);
            formData.append('photo', profilePicture);
        } else {
            formData.append('name', uname);
            formData.append('phoneNumber', uphoneNumber);
            formData.append('email', uEmail);
        }

        try {
            console.log(formData);
            const cookieValue = Cookies.get('jwt');
            const decodedToken = jwt.decode(cookieValue);
            const userId = decodedToken.id;
            const response = await axios.patch(`http://localhost:4002/studentVault/v1/users/${userId}`, formData);

            if (response.data.status === 'success') {
                alert('Updated successfully');
                window.location.reload();

            }
        } catch (err) {
            console.log(err.message);
            alert('Update failed');
        }
    };

    return (
        <Fragment>
            <div className='home-container'>
                <input type='checkbox' id='toggle' />
                <input type='checkbox' id='showEditProfile' />
                <div className='home-header'>
                    User Profile
                </div>
                <div className='user-profile-container'>
                    <div className='user-profile-image'>
                        <img src={`/images/user/${userData.photo}`} alt='user' />
                    </div>
                    <div className='user-profile-details'>
                        <div className='user-detail'>
                            <div>
                                Name
                            </div>
                            <div>
                                {userData.name}
                            </div>
                        </div>
                        <div className='user-detail'>
                            <div>
                                Email
                            </div>
                            <div>
                                {userData.email}
                            </div>
                        </div>
                        <div className='user-detail'>
                            <div>
                                Phone Number
                            </div>
                            <div>
                                {userData.phoneNumber}
                            </div>
                        </div>
                        <div className='user-detail'>
                            <div>
                                Role
                            </div>
                            <div>
                                {userData.role}
                            </div>
                        </div>

                    </div>
                </div>
                <div className='user-profile-container mt-5'>
                    <div>
                        <label htmlFor='toggle'>
                            <div className='add-user-button'>
                                Add user
                            </div>
                        </label>
                    </div>
                    <div>
                        <label htmlFor='showEditProfile'>
                            <div className='add-user-button edit'>
                                Edit Profile
                            </div>
                        </label>
                    </div>
                </div>
                <div className='home-add-user'>
                    <form className='row g-3 upload-form add-form'>
                        <label htmlFor='toggle'>
                            <div className='close-btn'>
                                Close
                            </div>
                        </label>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Name</label>
                            <input type="text" className="form-control upload-input" id="inputEmail4" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Email</label>
                            <input type="email" className="form-control upload-input" id="inputPassword4" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Phone Number</label>
                            <input type="number" className="form-control upload-input" id="inputPassword4" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Role</label>
                            <input type="text" className="form-control upload-input" id="inputPassword4" value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <div className="col-12 mt-5">
                            <button type="submit" className="btn w-25 upload-button" onClick={uploadUser}>Submit</button>
                        </div>
                    </form>
                </div>
                <div className='home-edit-user'>
                    <div className='edit-form-container'>
                        <div className='close-btn-wrapper'>
                            <label htmlFor='showEditProfile'>
                                <div className='close-btn'>
                                    Close
                                </div>
                            </label>
                        </div>
                        <form>
                            <div className="mb-3">
                                <label className='form-label'>Change Picture</label>
                                <input type="file" name='photo' className="form-control upload-input" id="inputGroupFile02" onChange={handleProfileImage} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Username</label>
                                <input type="text" name='name' className="form-control upload-input" id="formGroupExampleInput" placeholder={userData.name} onChange={(e) => {
                                    setuName(e.target.value)
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                                <input type="text" name='email' className="form-control upload-input" id="formGroupExampleInput2" placeholder={userData.email} onChange={(e) => {
                                    setuEmail(e.target.value)
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Phone Number</label>
                                <input type="number" name='phoneNumber' className="form-control upload-input" id="formGroupExampleInput2" placeholder={userData.phoneNumber} onChange={(e) => {
                                    setuPhoneNumber(e.target.value)
                                }} />
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn w-75 upload-button mt-3" onClick={update}>Update</button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </Fragment>
    )
}