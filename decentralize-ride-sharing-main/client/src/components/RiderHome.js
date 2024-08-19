import React, { Fragment, useRef, useState, useEffect } from "react";
import './css/RiderHome.css'
import { Icon } from '@iconify/react';
import Footer from "./footer";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Web3 from 'web3';


function RiderHome({ rideContract, banningContract }) {
    const toastOption = {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const [user, setUser] = useState(null);
    const [center, setCenter] = useState({
        lat: null,
        lon: null
    })
    useEffect(() => {
        const loadUserDataWithCookie = async () => {
            try {
                const token = Cookies.get('jwt');
                if (token) {
                    const response = await axios.post('https://dashboard.render.com/api/v1/users/getcookiedetails', {
                        token
                    });
                    setUser(response.data.data.freshUser);
                }
            } catch (err) {
                console.log(err);
            }
        };
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                });
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        };

        // fetchCurrentAccount();

        loadUserDataWithCookie();
        getLocation()
    }, []);
    const makeTrip = async (_pickUpLocation, _dropOffLocation, _pickUpDate, _pickUpTime) => {

        if (_pickUpLocation === '' || _dropOffLocation === '' || _pickUpDate === '' || _pickUpTime === '') {
            toast.error('One or more fields are empty', toastOption);
            return;
        } else {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set time to midnight

            const pickUpDate = new Date(_pickUpDate);
            pickUpDate.setHours(0, 0, 0, 0); // Set time to midnight

            if (pickUpDate < currentDate) {
                toast.error('Can only book trip for a future date', toastOption);
                return;
            }
        }

        try {
            if (!window.ethereum) {
                toast.error('MetaMask is not installed.', toastOption);
                return;
            }
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            // alert(accounts[0].toLowerCase() == user.account.toLowerCase())
            if (accounts[0].toLowerCase() !== user.account.toLowerCase()) {
                toast.error("Select your own account to make a transaction", toastOption);
                return;
            }
            const receipt = await rideContract.methods.makeTrip(_pickUpLocation, _dropOffLocation, _pickUpDate, _pickUpTime)
                .send({ from: accounts[0] });
            console.log("Inside trip", receipt);
            const locationRes = await axios.post(`https://dashboard.render.com/api/v1/location/addLocation/${user._id}`, {
                pickUpLocation: _pickUpLocation,
                dropOffLocation: _dropOffLocation,
                pickUpTime: _pickUpTime,
                lon: center.lon,
                lat: center.lat,
            });
            if (locationRes.data.status !== "success") {
                toast.error("Couldn't add location to the map", toastOption);
            } else {
                toast.success("Successfully submitted", toastOption);
                setTimeout(() => {
                    window.location.reload(true);
                }, 3000);
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            if (error.message.includes("revert you cannot make new request" || "you cannot make new request")) {
                toast.error("You cannot make a double request", toastOption);
            } else if (error.message.includes("revert Make PayMent For Previous Trip" || "Make PayMent For Previous Trip")) {
                toast.error("Make Payment For Previous Ride", toastOption);

            } else {
                toast.error("Transaction failed", toastOption);
            }
        }
    };
    const [tripData, setTripData] = useState({
        pickUpLocation: "",
        dropOffLocation: "",
        pickUpDate: "",
        pickUpTime: ""
    })
    const handleTripDatChange = (event) => {
        setTripData({
            ...tripData,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmitButton = async (e) => {
        e.preventDefault()
        makeTrip(tripData.pickUpLocation, tripData.dropOffLocation, tripData.pickUpDate, tripData.pickUpTime)
    }
    const myRef = useRef(0);
    const scrollToRef = () => {
        myRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <Fragment>
            <ToastContainer />
            <div className="image-container">
                <div className="rider-cta-container">
                    <h1 className="hero-cta-header">
                        Ride sharing made easy
                    </h1>
                    <div>
                        Ride with confidence, knowing that our dedicated team and innovative technology ensure a seamless and enjoyable ride experience for all.
                    </div>
                    <button className="bookNow-button mt-3" onClick={scrollToRef}>
                        Book Ride
                    </button>
                </div>
                <div className="scroll-container">
                    <img src="/images/Ellipse 1.png" className="scroll-ellipse-top" alt="ellipse" />
                    <img src="/images/Ellipse 1.png" className="scroll-ellipse-bottom" alt="ellipse" />
                    <div className="scrolling-wrapper">
                        <div className="home-hero-scroll-card" >
                            <img src="/images/scroll6.png" alt="scroll" />
                        </div>
                        <div className="home-hero-scroll-card">
                            <img src="/images/scroll1.png" alt="scroll" />
                        </div>
                        <div className="home-hero-scroll-card">
                            <img src="/images/scroll2.png" alt="scroll" />
                        </div>
                        <div className="home-hero-scroll-card">
                            <img src="/images/scroll3.png" alt="scroll" />
                        </div>
                        <div className="home-hero-scroll-card">
                            <img src="/images/scroll4.png" alt="scroll" />
                        </div>
                        <div className="home-hero-scroll-card">
                            <img src="/images/scroll5.png" alt="scroll" />
                        </div>

                    </div>
                </div>
            </div>
            <div ref={myRef} className="mb-5">
            </div>
            <div className="container d-flex booking-container">
                <div className="booking-form-container " >
                    <h4 >Make Your Trip</h4>
                    <form >
                        <div className="mb-3">
                            <label htmlFor="pick-up-location" className="form-label">PICK-UP LOCATION</label>
                            <input type="text" name="pickUpLocation" value={tripData.pickUpLocation} onChange={(e) => handleTripDatChange(e)} className="form-control" id="pick-up-location" placeholder="Thimphu..." />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="drop-off-location" className="form-label">DROP-OFF LOCATION</label>
                            <input type="text" value={tripData.dropOffLocation} name="dropOffLocation" onChange={(e) => handleTripDatChange(e)} className="form-control" id="drop-off-location" placeholder="Paro..." />
                        </div>
                        <div className="row g-3">
                            <div className="col">
                                <label htmlFor="pick-up-date" className="form-label">PICK-UP DATE</label>
                                <input type="date" value={tripData.pickUpDate} name="pickUpDate" onChange={(e) => handleTripDatChange(e)} className="form-control" id="pick-up-date" />
                            </div>
                            <div className="col">
                                <label htmlFor="pick-up-time" className="form-label">PICK-UP TIME</label>
                                <input type="time" value={tripData.pickUpTime} name="pickUpTime" onChange={(e) => handleTripDatChange(e)} className="form-control" id="pick-up-time" />
                            </div>
                        </div>
                        <button onClick={(e) => handleSubmitButton(e)} className="bookNow-button inside-form mt-4">
                            Book Now
                        </button>
                    </form>
                </div>

                <div className="booking-step-container mb-5">
                    <h4 className="text-center">Better way to book your perfect ride</h4>
                    <div className="step-container">
                        <div className="steps-content">
                            <Icon className="step-icon" icon="mdi:location-distance" />
                            <div>
                                Choose your pickup location
                            </div>
                        </div>
                        <div className="steps-content">
                            <Icon className="step-icon" icon="mdi:deal" />
                            <div>
                                Select the best driver
                            </div>
                        </div>
                        <div className="steps-content">
                            <Icon className="step-icon" icon="material-symbols:book" />
                            <div>
                                Book your trip
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </Fragment>
    )
}

export default RiderHome;
