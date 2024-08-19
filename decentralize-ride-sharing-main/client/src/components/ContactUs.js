import { React, Fragment, useState, useRef } from 'react';
import Footer from './footer';


import './css/ContactUs.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ContactUs(props) {
    const toastOption = {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const [contactData, setContactData] = useState({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: '',
        subject: '',
        message: '',
    })
    const handlecontactChange = (event) => {
        setContactData({
            ...contactData,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (e) => {
        try {
    
            e.preventDefault()
            var userRes;
            if (props.loggedIn) {
                userRes = await axios({
                    method: "POST",
                    url: `https://dashboard.render.com/api/v1/contact`,
                    data: {
                        firstname: props.profile.name.split(" ")[0],
                        lastname: props.profile.name.split(" ").length === 2 ? props.profile.name.split(" ")[1] : "---------",
                        email: props.profile.email,
                        phoneNumber: props.profile.phoneNumber,
                        subject: contactData.subject,
                        message: contactData.message
                    }
                })
            } else {
                userRes = await axios({
                    method: "POST",
                    url: `https://dashboard.render.com/api/v1/contact`,
                    data: {
                        firstname: contactData.firstname,
                        lastname: contactData.lastname,
                        email: contactData.email,
                        phoneNumber: contactData.phoneNumber,
                        subject: contactData.subject,
                        message: contactData.message
                    }
                })
            }
            console.log(userRes)
            if (userRes.data.status === "success") {
                toast.success("Thank you for contracting with us", toastOption)
                setTimeout(() => {
                    window.location.reload(true)
                }, 3000);
            }
        } catch (err) {
            toast.error(err, toastOption)
        }
    }
    const myRef = useRef(0);

    const scrollToRef = () => {
        myRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <Fragment>
            <ToastContainer />
            <div className='contact-hero-section'>
                <div className='about-us-hero-header container'>
                    <div className='about-us-hero-header-contents'>
                        <div>
                            <h4>
                                Welcome to RideTrust
                            </h4>
                        </div>
                        <div>
                            <div className="contactUs-content">
                                We'll always treat you with respect and look out for your safety. We do this by maintaining high standards, which start before your very first ride. Our proactive safety features are always on. And anytime, night or day, we offer real help from real humans.
                            </div>
                        </div>
                        <button className="bookNow-button about-us-join-btn mt-4" onClick={scrollToRef}>
                            Contact US
                        </button>
                    </div>
                </div>
                <div className='container community-nav'>
                    <div className='hero-nav-data'>
                        About US {'>'} Contact US
                    </div>
                    <div className='hero-nav-name'>
                        CONTACT US
                    </div>
                </div>
            </div>
            <div ref={myRef}></div>
            <div className='contactUs-container' >
                <div className='community-header container contact-header'>
                    Talk To Our Team
                </div>
                <div className='container'>
                    Our team is happy to answer your questions about RideTrust. Fill out form below and our team will reach out soon.
                </div>
                <div className='contact-form-container container'>
                    {!props.loggedIn ? (
                        <form className="row g-3">
                            {/* Second form for logged-in user */}
                            <div className="col-md-6">
                                <input type="text" className="form-control contact-input" placeholder="First name*" aria-label="First name" name='firstname' value={contactData.firstname} onChange={(e) => handlecontactChange(e)} />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control contact-input" name='lastname' value={contactData.lastname} onChange={(e) => handlecontactChange(e)} placeholder="Last name*" aria-label="Last name" />
                            </div>
                            <div className="col-md-6">
                                <input type="number" className="form-control contact-input" name='phoneNumber' value={contactData.phoneNumber} onChange={(e) => handlecontactChange(e)} placeholder="Phone Number*" aria-label="First name" />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control contact-input" name='email' placeholder="Email Address" value={contactData.email} onChange={(e) => handlecontactChange(e)} aria-label="Email Address*" />
                            </div>
                            <div>
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                    Subject
                                </label>
                                <textarea name='subject' className="form-control" id="exampleFormControlTextarea1" value={contactData.subject} onChange={(e) => handlecontactChange(e)} rows="2"></textarea>
                            </div>
                            <div>
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                    Message
                                </label>
                                <textarea name='message' className="form-control" id="exampleFormControlTextarea1" value={contactData.message} onChange={(e) => handlecontactChange(e)} rows="4"></textarea>
                            </div>
                            <div>
                                <button onClick={(e) => handleSubmit(e)} type="submit" className="contact-submit-button">
                                    Submit
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form className="row g-3">
                            {/* First form for non-logged-in user */}
                            {/* ... */}
                            <div>
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                    Subject
                                </label>
                                <textarea name='subject' value={contactData.subject} onChange={(e) => handlecontactChange(e)} className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                            </div>
                            <div>
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                    Message
                                </label>
                                <textarea name='message' value={contactData.message} onChange={(e) => handlecontactChange(e)} className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                            </div>
                            <div>
                                <button onClick={(e) => handleSubmit(e)} type="submit" className="contact-submit-button">
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}
