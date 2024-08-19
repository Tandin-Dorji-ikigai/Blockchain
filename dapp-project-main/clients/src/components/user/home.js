import React from 'react';
import '../css/home.css';
import cca from '../image/cca.png';
import { Icon } from '@iconify/react';

import Footer from './footer';

function Home() {
    return (
        <div>

            <div className='home-hero'>
                <div className='box-container'>
                    <div className='Box1'>
                        <h2>View Your CCA</h2>
                        <button>View</button>
                    </div>

                    <div className='Box2'>
                        <h1>Better way to Store your CCA points </h1>
                        <div className='record-container'>
                            <div className='record-icon-container'>
                                <Icon icon="ph:trophy-bold" className='record-icon' />
                                <div className="column">Participate</div>
                            </div>
                            <div className='record-icon-container'>
                                <Icon icon="ic:sharp-cloud-upload" className='record-icon' />
                                <div className="column">Record</div>
                            </div>
                            <div className='record-icon-container'>
                                <Icon icon="ic:baseline-remove-red-eye" className='record-icon' />
                                <div className="column">View</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='body'>
                <div className='image'>
                    <img src={cca} className="cca" alt='cca' height={300} />
                </div>
                <div className='description'>
                    <h3>Make Your CCA Points Secure </h3>
                    <p>
                        This Co-Curricular Activities Points System (CCAPS) is designed to give
                        recognition to students' achievements in the non-academic arena. The CCA
                        grade will reflect the students' involvement in the various co-curricular
                        activities both in and outside campus and will encourage participation by
                        all students.
                    </p>
                </div>

            </div>
            <Footer/>
        </div>
    )
}
export default Home;