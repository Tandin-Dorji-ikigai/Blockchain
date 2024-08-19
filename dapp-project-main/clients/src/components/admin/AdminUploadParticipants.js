import React, { Fragment, Component } from 'react';

export default class AdminUpload extends Component {
    render() {

        return (
            <Fragment>
                <div className='home-container'>
                    <div className='home-header'>
                        Admin Dashboard
                    </div>
                    <div className='upload-form-container'>
                        <form className='row g-3 upload-form' onSubmit={(event) => {
                            event.preventDefault();
                            this.props.createStudent(this.name.value, this.cid.value ,this.programsAttended.value, this.date.value, this.course.value);
                            console.log(this.name.value, this.cid.value ,this.programsAttended.value, this.date.value, this.course.value)
                        }}>
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">Name</label>
                                <input type="text" className="form-control upload-input" ref={(input => {
                                    this.name = input;
                                })} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Date</label>
                                <input type="date" className="form-control upload-input" id="inputPassword4" ref={(input => {
                                    this.date = input;
                                })}  />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Event</label>
                                <input type="text" className="form-control upload-input" id="inputPassword4" ref={(input => {
                                    this.programsAttended = input;
                                })}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Enrollment Number</label>
                                <input type="number" className="form-control upload-input" id="inputPassword4" ref={(input => {
                                    this.cid = input;
                                })} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Course</label>
                                <input type="text" className="form-control upload-input" id="inputPassword4" ref={(input => {
                                    this.course = input;
                                })} />
                            </div>

                            <div className="col-12 mt-5">
                                <button type="submit" className="btn w-25 upload-button">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}
