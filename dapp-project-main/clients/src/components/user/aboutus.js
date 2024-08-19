import React, { Fragment } from 'react';
import '../css/aboutus.css';

import Footer from './footer';

function About() {
    return (
        <Fragment>
            <div className='about-hero-container'>
            </div>
            <div className='about-content'>
                <div className='container'>
                    <div className='content'>
                        GCIT has introduce new CCAs, but it is recorded in google excel sheet. There is no efficient way of storing CCA points in GCIT at the moment. But when digital technology is used more frequently, a more secure, decentralized, and effective mechanism for handling student data is required. Blockchain technology can help in this situation.

                        With blockchain technology, managing and organizing Co-Curricular Activities (CCA) could be completely changed. By implementing blockchain-based CCA system, students, teachers, and administrators may have access to a secure and public platform to keep an eye on and manage CCA-related activities.
                        Digital credentialing is one potential application of blockchain technology in the administration of student data.
                    </div>

                </div>
                <div className='container about-vision-container'>
                    <img src='images/compas.png' className='vision-img' alt='vision' />
                    <div>
                        <div className='vision-qutation-container'>
                            <div className='vision-line'>
                            </div>
                            <img src='images/quation.png' alt='quote' />
                            <div className='vision-line'>
                            </div>
                        </div>
                        <div className='vision-content'>
                            The CCA Record documents your student life in US. It is a testimonial of your active involvement in co-curricular activities during your course of study.
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </Fragment>
    )
}
export default About;