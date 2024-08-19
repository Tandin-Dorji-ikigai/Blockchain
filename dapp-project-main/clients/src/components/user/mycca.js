import React, { Fragment, Component } from 'react';
import "../css/mycca.css"

import Footer from './footer';
class MyCCa extends Component {
    constructor(props) {
        super(props);
        this.pointsContainerRef = React.createRef();
    }
    render() {

        const userData = this.props.student;
        console.log(userData)
        return (
            <Fragment>

                <div className='cca-hero-container'>
                    <div className='cca-hero-cta'>
                        View Your CCA Points
                    </div>
                </div>
                <div className='cca-body-container'>
                    <div className='container'>
                        <div className='cca-search-container'>
                            <div className='cca-search-text'>
                                Type in your enrollment number and view your CCA
                            </div>
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                this.props.findStudent(this.cid.value);
                                this.pointsContainerRef.current.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                });
                            }}>

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control cca-search-button" placeholder="enrollment number" aria-describedby="button-addon2" ref={(input => {
                                        this.cid = input;
                                    })} />
                                    <button className="btn search-btn" type="submit" id="button-addon2">Search</button>
                                </div>
                            </form>
                        </div>

                        <div className='cca-step-container'>
                            <div className='cca-steps'>
                                <div>
                                    1
                                </div>
                                <div>
                                    Enter Your Enrollment Number
                                </div>
                            </div>
                            <div className='cca-steps'>
                                <div>
                                    2
                                </div>
                                <div>
                                    Search For Your CCA
                                </div>
                            </div>
                            <div className='cca-steps'>
                                <div>
                                    3
                                </div>
                                <div>
                                    View Your CCA
                                </div>
                            </div>
                        </div>
                        <div className='mb-5' ref={this.pointsContainerRef}>

                        </div>
                        <div className='cca-points-container' >
                            <div className='cca-points-header'>
                                <img src='images/logo.png' alt='logo' />
                                <div>Your CCA Points</div>
                                <div>Date : {userData[3]}</div>
                            </div>
                            <div className='cca-points-user-name'>
                                <div>
                                    Name : <b>{userData[0]} </b>
                                </div>
                                <div>
                                    Enrollment Number : <b>{userData[1]}</b>
                                </div>
                            </div>
                            <div className='cca-points-point'>
                                <div>
                                    Events Attended :
                                </div>
                                <div>
                                    <span>

                                        {userData[2]}

                                    </span>
                                </div>
                            </div>

                            <div className='cca-points-total'>
                                <div>Total CCA Points :</div>
                                <div>{userData[4]}</div>
                            </div>

                            {/* <div className='cca-btn-container' >
                                <button className='cca-download-btn'>Download</button>
                                <button className='cca-view-btn'>View Detail</button>
                            </div> */}
                        </div>

                        {/* <div className='cca-points-detail'>
                            <h5 className='text-center'>Your CCA Record Details</h5>
                            <table className="table cca-table">
                                <thead className='cca-table-head'>
                                    <tr>
                                        <th scope="col">SL.NO</th>
                                        <th scope="col">Event Type</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">CCA Points</th>
                                    </tr>
                                </thead>
                                <tbody className='cca-table-body'>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>XRPL Awareness Event</td>
                                        <td>25/03/2023</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Volunteer at Nekha</td>
                                        <td>34/04/2023</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Debate on Blockchain</td>
                                        <td>25/02/2023</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Debate on Blockchain</td>
                                        <td>25/02/2023</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Debate on Blockchain</td>
                                        <td>25/02/2023</td>
                                        <td>4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
}
export default MyCCa;