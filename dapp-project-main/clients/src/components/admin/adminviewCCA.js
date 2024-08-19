import React, { Fragment, Component } from 'react';

export default class AdminViewCCA extends Component {
    render() {
        console.log(this.props.studentList)
        return (
            <Fragment>
                <div className='home-container'>
                    <div className='home-header'>
                        View Student CCA
                    </div>
                    <div className='upload-form-container mb-5'>
                        <form
                            className="row g-3 upload-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                this.props.attendProgram(
                                    this.cid.value,
                                    this.programName.value,
                                    this.date.value
                                );
                            }}
                        >
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">
                                    Enrollment Number
                                </label>
                                <input
                                    type="number"
                                    className="form-control upload-input"
                                    id="inputPassword4"
                                    ref={(input) => {
                                        this.cid = input;
                                    }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="form-control upload-input"
                                    id="inputPassword4"
                                    ref={(input) => {
                                        this.date = input;
                                    }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">
                                    Event
                                </label>
                                <input
                                    type="text"
                                    className="form-control upload-input"
                                    id="inputPassword4"
                                    ref={(input) => {
                                        this.programName = input;
                                    }}
                                />
                            </div>

                            <div className="col-12 mt-5">
                                <button type="submit" className="btn w-25 upload-button">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='home-table-container'>
                        <div className='home-table table-responsive'>
                            <table className="table">
                                <thead className='table-head'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Enrollment Number</th>
                                        <th scope="col">Course</th>
                                        <th scope="col">Event Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Total Points</th>

                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {this.props.studentList.map((student, key) => (
                                        < tr key={key} >
                                            <th scope="row">{key + 1}</th>
                                            <td>{student[0]}</td>
                                            <td>{student[1]}</td>
                                            <td>{student[5]}</td>
                                            <td>{student[2].join(", ")}</td>
                                            <td>{student[3].join(", ")}</td>
                                            <td>{student[4]}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </Fragment >
        )
    }
}
