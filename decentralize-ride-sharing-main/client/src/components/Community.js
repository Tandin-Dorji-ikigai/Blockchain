import React, { Fragment, useRef } from 'react';
import Footer from './footer';
import { Link } from 'react-router-dom';

import './css/Community.css';
export default function CommunityPage() {

    const myRef = useRef(0);

    const scrollToRef = () => {
        myRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Fragment>
            <div className='community-hero-section'>
                <div className='about-us-hero-header container'>
                    <div className='about-us-hero-header-contents community-hero-contents'>
                        <div>
                            <h4>
                                Welcome to RideTrust
                            </h4>
                            <div className="contactUs-content">
                                Creating a safe and respectful community is not just the responsibility of the RideTrust team, but of every user. By actively participating in the voting process, we can work together to maintain a positive and trustworthy platform for all.
                            </div>
                        </div>
                        <button className="bookNow-button about-us-join-btn mt-4" onClick={scrollToRef}>
                            Vote Now
                        </button>
                    </div>
                </div>
                <div className='container community-nav'>
                    <div className='hero-nav-data'>
                        HOME {'>'} COMMUNITY
                    </div>
                    <div className='hero-nav-name'>
                        COMMUNITY
                    </div>
                </div>
            </div>
            
            <div className='community-container' ref={myRef}>
                <div className='community-header container'>
                    Monthly User Review
                </div>
                <div className='vote-trial-container container'>
                    <div className='container vote-idea-container'>
                        <Link className='community-user-link'>
                            <div className='community-user-card'>
                                <img src='images/user.png' alt='user' className='community-user-image' />
                                <div className='communit-user-name'>
                                    Tandin
                                </div>
                            </div>
                        </Link>
                        <div className='review-direction'>
                            The DISPLAYED user have been, acting negatively towards Drivers of RideTrust. see what they have to say and let us vote, if to ban the user or not.
                        </div>
                    </div>
                    <div className='vote-form-container' >
                        <div className='vote-form-header'>
                            BanPoll
                        </div>
                        
                        <form className='vote-form'>
                            <div className='vote-should'>
                                Should the user be banned from the platform?
                            </div>
                            <div className='next-poll'>
                                Next poll in 23 days.
                            </div>
                            <div className="vote-button-container">
                                <input type='radio' name='yes' className='vote-radio-button' required />
                                <div>
                                    Yes
                                </div>
                            </div>
                            <div className="vote-button-container">
                                <input type='radio' name='yes' className='vote-radio-button' required />
                                <div>
                                    No
                                </div>
                            </div>
                            <button className='signup-button mt-5'>
                                Vote
                            </button>

                            <div className='poll-ends'>
                                Poll ends in : 48 hours
                            </div>
                        </form>
                        {/* <div className='vote-result'>
                            <div className='vote-end-date'>
                                20/03/2023
                            </div>
                            <div>
                                Thank you for voting
                            </div>
                            <div className='user-profile-info-header community-vote-header'>
                                <Icon icon="material-symbols:how-to-vote-sharp" width='18' />
                                Result
                            </div>
                            <div className='vote-result-details'>
                                RESULT DETAILS
                            </div>
                            <div className='vote-results'>
                                <div className='vote-attribute'>
                                    <div>
                                        Yes :
                                    </div>
                                    <div>
                                        No :
                                    </div>
                                    <div>
                                        Total :
                                    </div>
                                </div>
                                <div className='vote-data'>
                                    <div>
                                        56%
                                    </div>
                                    <div>
                                        46%
                                    </div>
                                    <div>
                                        12213 Voters
                                    </div>
                                </div>
                            </div>
                            <div className='vote-desion'>
                                With the obtained result the user
                                <u>
                                    @god123
                                </u>
                                shall be banned from RideTrust for 2 month.
                            </div>
                        </div> */}
                        {/* <div className='vote-result already-vote'>
                            <div className='vote-should'>
                                Should the user be banned from the platform?
                            </div>
                            <div className='vote-already-submitted'>
                                <h4>Vote Already Submitted</h4>
                            </div>
                            <div className='poll-ends'>
                                Poll ends in : 48 hours
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
          
            <div className='process-container'>
                <div className='triangle community-triangle'>
                </div>
                <div className='process-steps container'>
                    <div className='process-steps-header'>
                        How it Works
                    </div>
                    <h4 className='newto'>
                        New to RideTrust Voting? No problem.
                    </h4>
                    <div className='process-dir'>
                        We have designed RideTrust voting system to be as easy and intuitive to use as possible.
                    </div>
                    <div className='vote-progress-step'>
                        <div className='vote-steps'>
                            <div>
                                1.
                            </div>
                            <div className='progress-detail'>
                                <h5 className='mt-2'>
                                    Select user
                                </h5>
                                <div className='mt-3'>
                                    Users with rating less than 2 is selected
                                </div>
                            </div>
                        </div>
                        <div className='vote-steps'>
                            <div>
                                2.
                            </div>
                            <div className='progress-detail'>
                                <h5 className='mt-2'>
                                    Get Vote
                                </h5>
                                <div className='mt-3'>
                                    Others users will vote if the selected user should be banned or not.                                </div>
                            </div>
                        </div>
                        <div className='vote-steps'>
                            <div>
                                3.
                            </div>
                            <div className='progress-detail'>
                                <h5 className='mt-2'>
                                    Get Results
                                </h5>
                                <div className='mt-3'>
                                    After the voting period result will be declared.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}