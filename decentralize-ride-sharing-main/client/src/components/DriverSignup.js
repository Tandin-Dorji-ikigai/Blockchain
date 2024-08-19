import { Link, useNavigate } from 'react-router-dom';

import "./css/DriverSignup.css";
import { useState,useEffect } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Web3 from 'web3';
import 'react-toastify/dist/ReactToastify.css';
export default function DriverSignup({banningContract}) {
    const [metaAccount, setCurrentAccount] = useState('');
    useEffect(() => {
        async function fetchCurrentAccount() {
            try {
                if (window.ethereum) {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.getAccounts();
                    setCurrentAccount(accounts[0] || '');
                } else {
                    setCurrentAccount('MetaMask is not installed.');
                }
            } catch (error) {
                console.error(error);
                setCurrentAccount('Error fetching current account.');
            }
        }

        fetchCurrentAccount();
    }, []);
    const navigate = useNavigate()
    const toastOption = {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const [firstData, setFirstData] = useState(true);
    const [secondData, setSecondData] = useState(false);
    const [thirdData, setThirdData] = useState(false);

    const handleNext = () => {
        if (firstData) {
            setFirstData(false);
            setSecondData(true);
        } else if (secondData) {
            setSecondData(false);
            setThirdData(true);
        }
    };

    //input data
    const [nameFirst, setNameFirst] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [vehicleModel, setVehiclModel] = useState('')
    const [licenseNumber, setLicenseNumber] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [plateNumber, setPlateNumber] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)


    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            if (thirdData) {
                if (metaAccount) {
                    try {
                        const accountRes = await Axios({
                            method: 'GET',
                            url: `https://dashboard.render.com/api/v1/users/searchAccount/${metaAccount}`
                        })
                        if (accountRes.data.data === null) {
                            const formData = new FormData();
                            formData.append('photo', profilePicture);
                            formData.append('email', email);
                            formData.append('name', nameFirst);
                            formData.append('phoneNumber', phoneNumber);
                            formData.append('password', password);
                            formData.append('passwordConfirm', confirmPassword);
                            formData.append('role', "driver");
                            formData.append('vehicleModel', vehicleModel);
                            formData.append('plateNo', plateNumber);
                            formData.append('licenseNo', licenseNumber);
                            formData.append('vehicleColor', vehicleColor);
                            formData.append('account', metaAccount);
                            const response = await Axios({
                                method: 'POST',
                                url: 'https://dashboard.render.com/api/v1/users/driverSignup',
                                data: formData,
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            })
                            console.log("response=====", response.data)
                            if (response.data.status === 'success') {
                                toast.success("Registered successfull", toastOption)
                                setTimeout(() => {
                                    navigate("/login");
                                }, 3000);
                            }
                        } else {
                            toast.error("Digital Wallet Aready taken Change The Wallet", toastOption)
                        }
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    toast.error("Login To Digital Dallet", toastOption)
                }
            }

        } catch (err) {
            alert(err.message)
            toast.error("Phone Number Already In Used")
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
                        Already a member?{" "}
                        <Link to="/login" style={{ color: "#01D28E" }}>
                            Login
                        </Link>
                    </p>
                </div>
                <div className="login-form-container driver-sign-up-form">
                    <div className='signup-nav'>
                        <div className={`signup-nav-item ${firstData ? 'active' : ''}`} onClick={() => {
                            setFirstData(true);
                            setSecondData(false);
                            setThirdData(false);
                        }}>1</div>
                        <div className={`signup-nav-item ${secondData ? 'active' : ''}`} onClick={() => {
                            setFirstData(false);
                            setSecondData(true);
                            setThirdData(false);
                        }}>2</div>
                        <div className={`signup-nav-item ${thirdData ? 'active' : ''}`} onClick={() => {
                            setFirstData(false);
                            setSecondData(false);
                            setThirdData(true);
                        }}>3</div>
                    </div>
                    <form className="login-form sign-up-form" onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <h2 className="login-text">
                            Sign up for RideTrust
                        </h2>

                        {firstData && (
                            <>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail4" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-label="First name"
                                            value={nameFirst}
                                            onChange={(e) => setNameFirst(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail4" className="form-label">Phone Number</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            aria-label="Last name"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword4"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputPassword4" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword4"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                        {secondData && (
                            <>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail4" className="form-label">Vehicle Model  </label>
                                        <input type="text" className="form-control"
                                            value={vehicleModel}
                                            onChange={(e) => {
                                                setVehiclModel(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="phone" className="form-label">Plate Number</label>
                                        <input type="number" className="form-control"
                                            value={plateNumber}
                                            onChange={(e) => {
                                                setPlateNumber(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="license" className="form-label">License Number</label>
                                    <input type="number" className="form-control"
                                        value={licenseNumber}
                                        onChange={(e) => {
                                            setLicenseNumber(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="color" className="form-label">Vehicle Color</label>
                                    <input type="text" className="form-control"
                                        value={vehicleColor}
                                        onChange={(e) => {
                                            setVehicleColor(e.target.value)
                                        }}
                                    />
                                </div>


                            </>
                        )}
                        {thirdData && (
                            <>
                                <div className="col-md-12">
                                    <label htmlFor="license" className="form-label">Profile Picture</label>
                                    <input className="form-control" type="file" id="formFile" accept="image/*" name='photo' onChange={(e) => setProfilePicture(e.target.files[0])}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="license" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                        <div className="form-group">
                            {thirdData ? <button onClick={(e) => thirdData && handleSubmit(e)} type="submit" className="signup-button login-form-button" >
                                Submit
                            </button> :
                                <button type="submit" className="signup-button login-form-button" onClick={handleNext}>
                                    Next
                                </button>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
