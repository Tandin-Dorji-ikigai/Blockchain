import React, { Fragment, Component } from 'react';
import axios from 'axios';
import '../css/AdminHome.css';
import { Icon } from '@iconify/react';
import { MutatingDots } from 'react-loader-spinner'
export default class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4002/studentVault/v1/users`);
            this.setState({ userData: response.data.data });
        } catch (error) {
            console.error('Retrieving Failed: Error getting data');
        }
    };



    render() {
        const { userData } = this.state;

        if (userData === null) {
            return (
                <div className='loader-container'>
                    <MutatingDots
                        height="100"
                        width="100"
                        color="#4fa94d"
                        secondaryColor='#4fa94d'
                        radius='12.5'
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            );
        }

        const count = userData.length;

        return (
            <Fragment>
                <div className='home-container'>
                    <div className='home-header'>
                        Admin Dashboard
                    </div>

                    <div className='home-card-container'>
                        <div className='home-card'>
                            <div className='home-card-detail'>
                                <div>Admins</div>
                                <div>{count}</div>
                            </div>
                            <div className='home-card-icon'>
                                <Icon icon="mdi:users-group" className='home-card-icon' />
                            </div>
                        </div>
                        <div className='home-card'>
                            <div className='home-card-detail'>
                                <div>Students</div>
                                <div>{this.props.studentCount}</div>
                            </div>
                            <div className='home-card-icon'>
                                <Icon icon="mdi:users-group" className='home-card-icon' />
                            </div>
                        </div>
                        <div className='home-card'>
                            <div className='home-card-detail'>
                                <div>Students</div>
                                <div>1000</div>
                            </div>
                            <div className='home-card-icon'>
                                <Icon icon="mdi:users-group" className='home-card-icon' />
                            </div>
                        </div>
                    </div>
                    <div className='home-table-container'>
                        <div className='home-header'>
                            No. of Admin
                        </div>
                        <div className='home-table table-responsive'>
                            <table className="table">
                                <thead className='table-head'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Role</th>

                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {userData &&
                                        userData.map((admin, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{admin.name}</td>
                                                <td>{admin.email}</td>
                                                <td>{admin.phoneNumber}</td>
                                                <td>{admin.role}</td>

                                            </tr>
                                        ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
