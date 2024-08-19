import { React, Fragment } from 'react';
import Footer from './footer';
import { Icon } from '@iconify/react';

import './css/AboutUs.css';

export default function AboutUs() {
  return (
    <Fragment>
      <div className='about-hero-section'>
        <div className='about-us-hero-header container'>
          <div className='about-us-hero-header-contents'>
            <div>
              <h4>
                Welcome to RideTrust
              </h4>
            </div>
            <div>
              <div className="contactUs-content">
                Experience dependable and trustworthy rides that cater to everyone's needs. We prioritize your safety and comfort, ensuring a seamless journey from start to finish. Join us today for a reliable transportation solution you can trust.
              </div>
            </div>
            <button className="bookNow-button about-us-join-btn mt-4">
              Join Us
            </button>
          </div>
        </div>
        <div className='container community-nav'>
          <div className='hero-nav-data'>
            HOME {'>'} ABOUT US
          </div>
          <div className='hero-nav-name'>
            ABOUT US
          </div>
        </div>
      </div>

      <div className='container about-container'>
        <div className='about-header'>
          We believe transportation's services are better decentralized
        </div>
        <div className='about-description'>
          Decentralized ride-sharing platforms typically use smart contracts to automate the process of matching drivers and passengers, managing payments, and enforcing rules and regulations.
        </div>

      </div>
  
  

      <div className='container'>
        <div className='landing-service-card abouts-service-card'>
          <div className='landing-card'>
            <div>
              <Icon icon="fluent:access-time-20-regular" width="100" className='landing-location-icon' />
            </div>
            <div className='user-friendly-exp'>
              Availability
            </div>
            <div className='landing-card-content'>
              Our platform will be available to users at all times, with minimal downtime or disruptions
            </div>
          </div>
          <div className='landing-card'>
            <div>
              <Icon icon="carbon:security" width="100" className='landing-location-icon' />
            </div>
            <div className='user-friendly-exp'>
              Transparency
            </div>
            <div className='landing-card-content'>
              Your data and transactions are secure and protected from unauthorized accessor manupulation
            </div>
          </div>
        </div>

        <div className='developer-container'>
          <h2>DEVELOPERS</h2>
          <div className='deveoper-images-container'>
            <div className='developer-img tandin'>
              <h4>
                Tandin Dorji
              </h4>
            </div>
            <div className='developer-img dhendup'>
              <h4>
                Dhendup Tshering
              </h4>
            </div>
          </div>
        </div>
        <div className='developer-container mt-4'>
          <div className='deveoper-images-container'>
            <div className='developer-img developer-chador'>
              <h4>
                Chador Wangdi
              </h4>
            </div>
            <div className='developer-img developer-dorji'>
              <h4>
                Dorji Tsheten
              </h4>
            </div>
          </div>
        </div>
      </div>



      <Footer />
    </Fragment>
  )
}