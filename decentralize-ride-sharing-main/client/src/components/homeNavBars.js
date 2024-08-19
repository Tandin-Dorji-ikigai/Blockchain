import React, { Fragment, useState, useEffect,useCallback } from 'react'
import { Icon } from '@iconify/react';

import { Outlet, Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import axios from 'axios';
import Web3 from 'web3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './homeNavBar.css';

function HomeNav(props) {
    const navigate = useNavigate()
    const toastOption = {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [user, setUser] = useState(null);
    const [driver, setDriver] = useState({})
    const [rider, setRider] = useState({})
    const [feedback, setFeedback] = useState("")
    const [location, setLocation] = useState({})
    const [ether, setEther] = useState(0)
    const [remarks, setRemarks] = useState("")
    const [rate, setRating] = useState("")
    const [completeFeedback, setCompleteFeedBack] = useState("")

    const loadUserDataWithCookie = useCallback(async () => {
        try {
            const token = Cookies.get('jwt');
            if (token) {
                await axios.post('https://dashboard.render.com/api/v1/users/getcookiedetails', { token })
                    .then(async (response) => {
                        setUser(response.data.data.freshUser);

                        var conditionDriver_Rider;
                        if (response.data.data.freshUser?.role === "rider") {
                            conditionDriver_Rider = "userLocation";
                        } else if (response.data.data.freshUser?.role === "driver") {
                            conditionDriver_Rider = "driverLocation";
                        }

                        const checkRequest = await axios.get(`https://dashboard.render.com/api/v1/location/${conditionDriver_Rider}/${response.data.data.freshUser?._id}`);
                        setLocation(checkRequest.data.data[0]);

                        if (checkRequest.data.data.length > 0 && (checkRequest.data.data[0].status === "pending" || checkRequest.data.data[0].status === "accepted") && response.data.data.freshUser.role === "rider") {
                            setRequestAccepted(true);
                            const driverDetails = await axios.get(`https://dashboard.render.com/api/v1/vehicle/${checkRequest.data.data[0]?.driverId}`);
                            setDriver(driverDetails.data.data[0]);
                        } else if (checkRequest.data.data.length > 0 && response.data.data.freshUser.role === "rider" && checkRequest.data.data[0].status === "done") {
                            setShowPaymentNotification(true);
                        } else if (checkRequest.data.data.length > 0 && checkRequest.data.data[0].status === "accepted" && response.data.data.freshUser.role === "driver") {
                            setDriverNotification(true);
                            const riderDetails = await axios.get(`https://dashboard.render.com/api/v1/users/${checkRequest.data.data[0]?.ownerData}`);
                            setRider(riderDetails.data.data);
                        }
                    });
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        loadUserDataWithCookie();
    }, [loadUserDataWithCookie]);


    useEffect(() => {
        loadUserDataWithCookie();
    }, [loadUserDataWithCookie]);

    const RideCancleAndProvideFeedBack = async (e) => {
        e.preventDefault()
        // props.rideContract.methods.
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
            if (user?.role === "rider") {
                await props.rideContract.methods.cancelRiderRequest(feedback).send({ from: accounts[0] }).then(async () => {
                    const deletingLocationRes = await axios.get(`https://dashboard.render.com/api/v1/location/userLocation/${user?._id}`)
                    console.log("deletingLocationRes", deletingLocationRes.data.data[0]._id)
                    if (deletingLocationRes.data.data[0]._id) {
                        await axios.delete(`https://dashboard.render.com/api/v1/location/${deletingLocationRes.data.data[0]._id}`).then((respond) => {
                            if (respond.data.status === "success") {
                                toast.success("Ride Cancelled", toastOption)
                                setTimeout(() => {
                                    window.location.reload(true)
                                }, 3000);
                            }
                        })
                    }
                })
            } else if (user?.role === "driver") {
                // alert("askldjlaksd")
                // console.log("locayion_id",location._id)
                await props.rideContract.methods.cancelDriverRequest(feedback).send({ from: accounts[0] }).then(async () => {
                    await axios.delete(`https://dashboard.render.com/api/v1/location/${location?._id}`).then((respond) => {
                        if (respond.data.status === "success") {
                            toast.success("Ride Cancelled", toastOption)
                            setTimeout(() => {
                                window.location.reload(true)
                            }, 3000);
                        }
                    })
                })
            }

        } catch (err) {
            console.log(err)
            toast.error("Transaction failed", toastOption)
        }

    }

























    const makePayMent = async (e) => {
        e.preventDefault()
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
            await axios.get(`https://dashboard.render.com/api/v1/users/${location?.driverId}`).then(async (dri) => {
                await Promise.all([props.banningContract.methods.rateUser(dri.data.data?.account, rate).send({ from: accounts[0] }),
                props.rideContract.methods.payment(remarks).send({ from: accounts[0], value: web3.utils.toWei(ether, 'ether') })]).then(async () => {
                    await axios({
                        method: "PATCH",
                        url: `https://dashboard.render.com/api/v1/location/${location?._id}`,
                        data: {
                            status: "payed",
                        }
                    })
                    await axios({
                        method: "POST",
                        url: `https://dashboard.render.com/api/v1/feedback/${user?._id}`,
                        data: {
                            rating: rate,
                            feedback: completeFeedback
                        }

                    }).then(async (feedbackRes) => {
                        console.log("feedbackRes", feedbackRes.data)
                        if (feedbackRes.data.status === "success") {
                            await axios.delete(`https://dashboard.render.com/api/v1/location/${location?._id}`).then((locationRes) => {
                                if (locationRes.data.status === "success") {
                                    toast.success("Thank You For Your Feedback", toastOption)
                                    setTimeout(() => {
                                        window.location.reload(true)
                                    }, 3000);
                                }
                            })
                        }
                    })
                })
            })
        } catch (error) {
            console.log("catch eror in payment and voting", error)
            if (error.message.includes("revert Target user is already banned" || "Target user is already banned")) {
                toast.error("Driver is already banned", toastOption);
            } else if (error.message.includes("revert already rated" || "already rated")) {
                toast.error("Already given the feedback", toastOption);
            }
        }
    }













    const completedTrip = async (e) => {
        e.preventDefault()
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
            await props.rideContract.methods.tripCompleted().send({ from: accounts[0] }).then(async () => {
                await axios({
                    method: "PATCH",
                    url: `https://dashboard.render.com/api/v1/location/${location._id}`,
                    data: {
                        status: "done",
                    }
                }).then((result) => {
                    if (result.data.status === "success") {
                        toast.success("Thank you for Your Service", toastOption)
                        setTimeout(() => {
                            window.location.reload(true)
                        }, 3000);
                    }
                })
            })
        } catch (err) {
            console.log(err)
            toast.error("Transaction Failed : Please Try Again")
        }
    }






    useEffect(() => {
        // Update the width when the window is resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    const handleClick = () => {
        scroolToTop();

        const checkbox = document.getElementById('toggle-logout');

        if (checkbox && checkbox.checked) {
            checkbox.checked = false;
        }


    };

    //make the checkbox unchecked
    if (windowWidth > 810) {
        const checkbox = document.getElementById('toggle');

        if (checkbox && checkbox.checked) {
            checkbox.checked = false;
        }
    }


    const closeNavBar = () => {
        const checkbox = document.getElementById('toggle');

        if (checkbox && checkbox.checked) {
            checkbox.checked = false;
        }
    }

    //scroll to top when clicking on link
    function scroolToTop() {
        window.scrollTo(0, 0);
    }

    //render userrating star
    const rating = 5;

    const renderStars = () => {
        const starCount = Math.round(rating);
        const stars = [];

        for (let i = 0; i < starCount; i++) {
            stars.push(<Icon key={i} icon="material-symbols:star-rounded" className='profile-star' />);
        }

        return stars;
    };

    //model popup
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //payment form model
    const [showPaymentForm, setpaymentForm] = useState(false);
    const showPayment = () => setpaymentForm(true);

    const hidePayment = () => setpaymentForm(false)

    //cancel trip form model
    const [showCancelForm, setCancelForm] = useState(false);
    const ShowCanceledForm = () => {
        handleClose();
        setCancelForm(true);
    }
    const hideCanceledForm = () => setCancelForm(false);

    //condition to display cancel ride button 
    const [Rideaccepted, setRideaccepted] = useState(true);

    const handleAcceptTrip = () => {
        setRideaccepted(true);
    };

    //feedback form
    //model popup
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const showRideFeedbackForm = () => {
        hidePayment();
        setShowFeedbackForm(true);

    }
    const closeFeedbackForm = () => setShowFeedbackForm(false);

    // Render Notifications
    const [showReqeustAcceptedNotification, setRequestAccepted] = useState(false);
    const [showPaymentNotification, setShowPaymentNotification] = useState(false);
    const [driverNotification, setDriverNotification] = useState(false)

    const [showRiderDetail, setShowRiderDetail] = useState(false)
    const showRiderInfo = () => setShowRiderDetail(true);
    const closeRiderInfo = () => setShowRiderDetail(false);
    const driverCancelTrip = () => {
        closeRiderInfo();
        setCancelForm(true);
    }

    const imagePath = '/workspaces/RideSharing/decentralize-ride-sharing/server/views/user';
    return (
        <Fragment>
            <ToastContainer />
            <input type='hidden' onClick={handleAcceptTrip} />
            <div className='nav-bar-wrapper'>
                <input type="checkbox" name="" id="toggle" />
                <div className='nav-bar-dynamic-container'>
                    <div className='nav-bar-sticky container'>
                        <div className='nav-bar-dynamic '>
                            <div className='nav-logo-container'>
                                <img src='/images/DarkLogo.jpeg' className='logo-dark' alt='logo' />
                                <img src='/images/LightLogo.jpeg' className='logo-light' alt='logo' />
                                <div className='logo-name-container'>RIDE <span>TRUST</span> </div>
                            </div>
                            <div className='nav-menu-container'>
                                <div>
                                    <label htmlFor="toggle">
                                        <Icon className='nav-ham-menu' icon="pajamas:hamburger" />MENU
                                    </label>
                                </div>
                            </div>
                            <div className='nav-links-container'>
                                <ul className='nav-links-items'>
                                    {props.loggedIn && (
                                        <>
                                            <li>
                                                <Link to="home" className='link-items' onClick={handleClick}>Home</Link>
                                            </li>
                                            <li>
                                                <Link to="community" className='link-items' onClick={handleClick}>Community</Link>
                                            </li>
                                        </>
                                    )}
                                    <li>

                                        <Link to="about" className='link-items' onClick={handleClick}>About Us</Link>

                                    </li>
                                    <li>
                                        <Link to="contact" className='link-items' onClick={handleClick}>Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                            {props.loggedIn ? (
                                <label htmlFor="toggle-logout" className='toogle-logout'>
                                    <div className='nav-profile-container slide-profile'>
                                        <img src={`${imagePath}/${props.profile?.photo}`} alt='userPhoto' />
                                        <div className='profile-detail-container'>
                                            <span>{props.profile?.name?.split(" ")[0].toUpperCase()}</span>
                                            <span>eth : {parseFloat(props.balance).toFixed(3)}</span>
                                        </div>

                                    </div>
                                </label>
                            ) : (
                                <div className='button-container'>
                                    <Link to='/login'>
                                        <button className='login-button'>Login</button>
                                    </Link>
                                    <Link to='/signupRedirect'>
                                        <button className='signup-button'>Signup</button>
                                    </Link>
                                </div>

                            )}
                        </div>
                    </div>

                </div>
                <div className='container profile-options'>
                    <input type="checkbox" name="" id="toggle-logout" />

                    <div className='logOut-container'>
                        <Link className='profile-items' to='profile' onClick={handleClick}>
                            Profile
                        </Link>
                        <div className='profile-items'>
                            <button className='profile-logOut-button' onClick={() => {
                                Cookies.remove('jwt')
                                // window.location.reload(true)
                                navigate("/")
                            }}>
                                <Icon icon="ic:outline-logout" className='profile-logout-icon' />
                                <span>
                                    Logout
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                {showReqeustAcceptedNotification && (
                    <div className='nav-notification-card'>
                        <div className='nav-notification-header'>
                            <Icon icon='material-symbols:notifications-active' className='nav-notification-icon' />
                            <div>Request Send</div>
                        </div>
                        <div>
                            <Link>
                                <button className='signup-button makepayment-button' onClick={handleShow}>
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
                {showPaymentNotification && (
                    //Ride Completed
                    <div className='nav-notification-card'>
                        <div className='nav-notification-header'>
                            <Icon icon="material-symbols:notifications-active" className='nav-notification-icon' />
                            <div>
                                Ride Completed
                            </div>
                        </div>
                        <div>
                            <Link>
                                <button className='signup-button makepayment-button' onClick={showPayment}>
                                    Make Payment
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
                {driverNotification && (
                    <div className='nav-notification-card'>
                        <div className='nav-notification-header'>
                            <Icon icon="material-symbols:notifications-active" className='nav-notification-icon' />
                            <div>
                                Request Accepted
                            </div>
                        </div>
                        <div>
                            <Link>
                                <button className='signup-button makepayment-button' onClick={showRiderInfo}>
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
                <div className='menu-slide'>
                    <div className='nav-profile-container '>
                        <img src={`${imagePath}/${props.profile?.photo}`} alt='userPhoto' />
                        <div className='profile-detail-container'>
                            <span>{props.profile?.name?.split(" ")[0].toUpperCase()}</span>
                            <span>{"  "} eth : {parseFloat(props.balance).toFixed(3)}</span>
                        </div>
                    </div>
                    <ul className='menu-slide-items'>
                        <li>
                            <Link to="home" className='link-items slide-links' onClick={closeNavBar}>Home</Link>
                        </li>
                        <li>
                            <Link to="community" className='link-items slide-links' onClick={closeNavBar}>Community</Link>
                        </li>
                        <li>

                            <Link to="about" className='link-items slide-links' onClick={closeNavBar}>About Us</Link>

                        </li>
                        <li>
                            <Link to="contact" className='link-items slide-links' onClick={closeNavBar}>Contact Us</Link>
                        </li>
                        <li>
                            <Link to="profile" className='link-items slide-links' onClick={closeNavBar}>Profile</Link>
                        </li>
                        <li>
                            <button onClick={() => {
                                Cookies.remove('jwt')
                                window.location.reload(true)
                                navigate("/");
                            }} className='profile-logOut-button'>
                                log Out
                            </button>
                        </li>

                    </ul>

                </div>
            </div>

            {/* User detail popup */}
            <Modal show={show} onHide={handleClose} animation={false}>
                {driver.user?.role === "driver" ?
                    <Modal.Body>
                        <div className='request-popup-container'>
                            <Link className='community-user-link'>
                                <div className='community-user-card'>
                                    <img src='/images/user.png' alt='user' className='community-user-image' />
                                    <div className='communit-user-name'>
                                        {driver.user?.name}
                                    </div>
                                </div>
                            </Link>
                            <div className='profile-username-container request-accepted-headr'>
                                <div className='profile-username'>
                                    Request Accepted
                                </div>
                                <div className='profile-location'>
                                    <Icon icon="material-symbols:location-on-rounded" />
                                    <div>
                                        {driver.user?.address}
                                    </div>
                                </div>
                            </div>
                            <div className='profile-rate'>
                                RATING
                            </div>
                            <div className='user-profile-rating mt-1'>
                                <div className='user-profile-rating-number'>
                                    {rating}
                                </div>
                                <div className='user-profile-rating-star'>
                                    {renderStars()}
                                </div>
                            </div>
                            <div>
                                <div className='user-social  mt-4'>
                                    Social
                                </div>
                                <div className='user-profile-social mt-2'>
                                    <a href="https://www.instagram.com/your_instagram_url" target="_blank" rel="noopener noreferrer">
                                        <Icon icon="mdi:instagram" className='profile-social-ig' />
                                    </a>
                                    <a href="https://www.facebook.com/your_facebook_url" target="_blank" rel="noopener noreferrer">
                                        <Icon icon="ant-design:facebook-filled" className='profile-social-fb' />
                                    </a>
                                </div>
                            </div>
                            <div className='user-profile-information'>
                                <div className='user-profile-info-header'>
                                    <Icon icon="mdi:user" />
                                    About
                                </div>

                                <div className='profile-contact-info'>
                                    CONTACT INFORMATION
                                </div>
                                <div className='user-profile-contact-info'>
                                    <div className='contact-attribute-container'>
                                        <span className='contact-attribute'>Phone :</span>
                                        <span className='contact-attribute'>Email :</span>
                                        <span className='contact-attribute'>Address :</span>
                                    </div>
                                    <div className='contact-value-container'>
                                        <span className='contact-value'>{driver.user?.phoneNumber}</span>
                                        <span className='contact-value'>{driver.user?.email}</span>
                                        <span className='contact-value'>{driver.user?.address}</span>
                                    </div>
                                </div>
                                <div className='profile-contact-info'>
                                    VEHICLE INFORMATION
                                </div>
                                <div className='user-profile-contact-info'>
                                    <div className='contact-attribute-container'>
                                        <span className='contact-attribute'>Vehicle Model :</span>
                                        <span className='contact-attribute'>Vehicle Color :</span>
                                        <span className='contact-attribute'>Plate Number :</span>
                                    </div>
                                    <div className='contact-value-container'>
                                        <span className='contact-value'>{driver.vehicleModel}</span>
                                        <span className='contact-value'>{driver.vehicleColor}</span>
                                        <span className='contact-value'>{driver.plateNo}</span>
                                    </div>
                                </div>
                                {Rideaccepted && (
                                    <button className='signup-button' onClick={ShowCanceledForm}>Cancel Trip</button>
                                )}
                            </div>
                        </div>

                    </Modal.Body> : <Modal.Body>
                        <div className='request-popup-container'>
                            <div className='profile-username-container request-accepted-headr'>
                                <div className='profile-username'>
                                    Request Not Accepted
                                </div>
                            </div>

                            <div className='user-profile-information'>
                                {Rideaccepted && (
                                    <button className='signup-button' onClick={ShowCanceledForm}>Cancel Trip</button>
                                )}
                            </div>
                        </div>

                    </Modal.Body>

                }
                <Modal.Footer>
                    {/* <Button className='close-button' onClick={handleClose}>
                        Confirm
                    </Button> */}
                    <Button className='close-button' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Payment Form */}
            <Modal show={showPaymentForm} onHide={hidePayment} animation={false}>

                <Modal.Body>
                    <form className="rider-feedback-form payment-form">
                        <div className='user-profile-contact-info payment-form-items'>
                            <div className='contact-attribute-container payment-attribute'>
                                <span className='col contact-attribute'>To :</span>
                                <span className='col contact-attribute'>Amount :</span>
                                <span className=' col contact-attribute'>Remarks :</span>
                            </div>
                            <div className='contact-value-container-edit'>
                                <div className="col-md-12">
                                    <input type="text" value={location?.driverId} className="form-control" id="phoneNo" />
                                </div>
                                <div className="col-md-12">
                                    <input type="number" value={ether} onChange={(e) => setEther(e.target.value)} className="form-control" id="Email" />
                                </div>
                                <div className="col-md-12">
                                    <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} className="form-control" id="address" />
                                </div>
                            </div>
                        </div>

                        <button className="signup-button mt-4" onClick={showRideFeedbackForm}>Submit</button>
                    </form>

                </Modal.Body>
                <Modal.Footer>

                    <Button className='close-button' onClick={hidePayment}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Cancel trip Form */}
            <Modal show={showCancelForm} onHide={hideCanceledForm} animation={false} size='lg'>
                <Modal.Body>
                    <div className='cancel-ride-form-container'>
                        <form className="rider-feedback-form">
                            <div className="feedback-share">
                                Your feedback is important to the Driver. Could you provide a reason for canceling your trip?
                            </div>
                            <div>
                                <div className="col-md-12">
                                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="form-control" rows="5"></textarea>
                                </div>
                            </div>
                            <div className="mt-5 feedback-submit-button">
                                <button onClick={(e) => RideCancleAndProvideFeedBack(e)} className="signup-button w-50">Submit</button>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer>

                    <Button className='close-button' onClick={hideCanceledForm}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Feedback Submit Form */}
            <Modal show={showFeedbackForm} onHide={closeFeedbackForm} animation={false} backdrop="static"
                keyboard={false} size="lg">
                <Modal.Body>
                    <div className="rider-feedback-form-container">
                        <div className="rider-feedback-form-header">
                            <div className='nav-logo-container '>
                                <img src='images/DarkLogo.jpeg' className='feedback-logo-dark' alt='logo' />
                            </div>
                            <div className="d-flex align-items-center">
                                Thank you for choosing
                                <div className='feedback-form-logo-name mx-3'>RIDE<span>TRUST</span> </div>
                            </div>
                        </div>
                        <form className="rider-feedback-form">
                            <div className="form-trip-question">
                                How was the trip with <span className="home-feedback-user-name">@Tandin</span> ?
                            </div>
                            <div className="feedback-rating-container">
                                <div className="rating-option-container">
                                    <input type="radio" className="feedback-rating" value="1" checked={rate === "1"} onChange={(e) => setRating(e.target.value)} name="options" id="option1" autoComplete="off" />
                                    <label className="user-rating-btn" htmlFor="option1">1</label>
                                </div>
                                <div className="rating-option-container">
                                    <input type="radio" value="2" checked={rate === "2"} onChange={(e) => setRating(e.target.value)} className="feedback-rating" name="options" id="option2" autoComplete="off" />
                                    <label className="user-rating-btn" htmlFor="option2">2</label>
                                </div>
                                <div className="rating-option-container">
                                    <input type="radio" value="3" checked={rate === "3"} onChange={(e) => setRating(e.target.value)} className="feedback-rating" name="options" id="option3" autoComplete="off" />
                                    <label className="user-rating-btn" htmlFor="option3">3</label>
                                </div>
                                <div className="rating-option-container">
                                    <input type="radio" value="4" checked={rate === "4"} onChange={(e) => setRating(e.target.value)} className="feedback-rating" name="options" id="option4" autoComplete="off" />
                                    <label className="user-rating-btn" htmlFor="option4">4</label>
                                </div>
                                <div className="rating-option-container">
                                    <input type="radio" value="5" checked={rate === "5"} onChange={(e) => setRating(e.target.value)} className="feedback-rating" name="options" id="option5" autoComplete="off" />
                                    <label className="user-rating-btn" htmlFor="option5">5</label>
                                </div>
                            </div>

                            <div className="feedback-share">
                                Please share your feedback with RideTrust. The more detail the better
                            </div>
                            <div>
                                <div className="col-md-12">
                                    <textarea value={completeFeedback} onChange={(e) => setCompleteFeedBack(e.target.value)} className="form-control" rows="5"></textarea>
                                </div>
                            </div>
                            <div className="mt-5 feedback-submit-button">
                                <button onClick={(e) => makePayMent(e)} className="signup-button w-50">Submit</button>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button className='close-button' onClick={closeFeedbackForm}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Rider detail popup */}
            <Modal show={showRiderDetail} onHide={closeRiderInfo} animation={false}>
                <Modal.Body>
                    <div className='request-popup-container'>
                        <Link className='community-user-link'>
                            <div className='community-user-card'>
                                <img src='/images/user.png' alt='user' className='community-user-image' />
                                <div className='communit-user-name'>
                                    {rider?.name}
                                </div>
                            </div>
                        </Link>
                        <div className='profile-username-container request-accepted-headr'>
                            <div className='profile-username'>
                                Request Accepted
                            </div>
                            <div className='profile-location'>
                                <Icon icon="material-symbols:location-on-rounded" />
                                <div>
                                    {rider.address}
                                </div>
                            </div>
                        </div>
                        <div className='profile-rate'>
                            RATING
                        </div>
                        <div className='user-profile-rating mt-1'>
                            <div className='user-profile-rating-number'>
                                {rating}
                            </div>
                            <div className='user-profile-rating-star'>
                                {renderStars()}
                            </div>
                        </div>
                        <div>
                            <div className='user-social  mt-4'>
                                Social
                            </div>
                            <div className='user-profile-social mt-2'>
                                <a href="https://www.instagram.com/your_instagram_url" target="_blank" rel="noopener noreferrer">
                                    <Icon icon="mdi:instagram" className='profile-social-ig' />
                                </a>
                                <a href="https://www.facebook.com/your_facebook_url" target="_blank" rel="noopener noreferrer">
                                    <Icon icon="ant-design:facebook-filled" className='profile-social-fb' />
                                </a>
                            </div>
                        </div>
                        <div className='user-profile-information'>
                            <div className='user-profile-info-header'>
                                <Icon icon="mdi:user" />
                                About
                            </div>

                            <div className='profile-contact-info'>
                                RIDER INFORMATION
                            </div>
                            <div className='user-profile-contact-info'>
                                <div className='contact-attribute-container'>
                                    <span className='contact-attribute'>Phone :</span>
                                    <span className='contact-attribute'>Email :</span>
                                    <span className='contact-attribute'>Address :</span>
                                </div>
                                <div className='contact-value-container'>
                                    <span className='contact-value'>{rider?.phoneNumber}</span>
                                    <span className='contact-value'>{rider?.email}</span>
                                    <span className='contact-value'>{rider?.address}</span>
                                </div>
                            </div>
                            <div className='profile-contact-info'>
                                PICKUP LOCATION
                            </div>
                            <div className='user-profile-contact-info'>
                                <div className='contact-attribute-container'>
                                    <span className='contact-attribute'>Location :</span>
                                    <span className='contact-attribute'>Time :</span>
                                    <span className='contact-attribute'>Date :</span>
                                </div>
                                <div className='contact-value-container'>
                                    <span className='contact-value'>{location?.dropOffLocation}</span>
                                    <span className='contact-value'>{location?.pickUpTime}</span>
                                    {/* <span className='contact-value'>{l}</span> */}
                                </div>
                            </div>
                            {Rideaccepted && (
                                <button className='signup-button' onClick={driverCancelTrip}>Cancel Trip</button>
                            )}
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button className='close-button' onClick={(e) => completedTrip(e)}>
                        Completed
                    </Button>
                    <Button className='close-button' onClick={closeRiderInfo}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Outlet />
        </Fragment >
    )
}

export default HomeNav;
