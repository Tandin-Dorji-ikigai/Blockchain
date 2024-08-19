import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './components/admin/AdminHome';
import AdminProfile from './components/admin/adminProfile';
import AdminUpload from './components/admin/AdminUploadParticipants';
import AdminSideNav from './components/admin/sideNav';
import AdminViewCCA from './components/admin/adminviewCCA';

//user Frontend
import Home from './components/user/home';
import NavBar from './components/user/NavBar';
import About from './components/user/aboutus';
import LoginPage from './components/user/login';
import MyCCa from './components/user/mycca';
import ForgotPassword from "./components/user/ForgotPassword"
import { STUDENT_RECORD, STUDENT_RECORD_ABI } from './abi/studentRecord';
import Web3 from 'web3';

class App extends Component {

  state = {
    account: '',
    studentCount: 0,
    students: [],
    loading: true,
    student: ''
  }

  async componentDidMount() {
    try {
      await window.ethereum.enable();
      this.loadBlockchainData();
    } catch (error) {
      console.error('Error connecting to the Ethereum network:', error);
    }
  }

  async loadBlockchainData() {
    try {

      const web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7549');
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });

      const studetRecord = new web3.eth.Contract(STUDENT_RECORD_ABI, STUDENT_RECORD);
      this.setState({ studetRecord })

      const studentCount = await studetRecord.methods.studentCount().call();
      this.setState({ studentCount });
      const students = [];
      for (let i = 1; i <= studentCount; i++) {
        const studentId = await studetRecord.methods.studentIDs(i - 1).call();
        const student = await studetRecord.methods.getStudentDetails(studentId).call();
        students.push(student);
      }


      this.setState({ students, loading: false });
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }

  }

  createStudent(name, cid, programsAttended, date, course) {
    // Validate arguments
    if (cid.trim() === '' || name.trim() === '' || programsAttended === '' || date === '' || course === '') {
      console.error('Invalid arguments: All data are required');
      return;
    }
    console.log(name, cid, programsAttended, `${date}`, course)
    this.setState({ loading: true });
    this.state.studetRecord.methods
      .registerStudent(name, cid, programsAttended, `${date}`, course)
      .send({ from: this.state.account })
      .once('receipt', () => {
        this.setState({ loading: false });
        this.loadBlockchainData();
      })
      .catch((error) => {
        console.error('Error creating student:', error);
        this.setState({ loading: false });
      });
  }

  attendProgram(cid, programName, date) {
    // console.log(name, cid, programName, date, course);
    this.setState({ loading: true });
    this.state.studetRecord.methods
      .attendProgram(cid, programName, date)
      .send({ from: this.state.account })
      .once("receipt", () => {
        this.setState({ loading: false });
        this.loadBlockchainData();
      });
  }

  async findStudent(cid) {
    try {
      this.setState({ loading: true });
      const student = await this.state.studetRecord.methods.getStudentDetails(cid).call();
      this.setState({ student });
    } catch (error) {
      console.error('Error getting student details:', error);
    } finally {
      this.setState({ loading: false });
    }
  }


  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />} >
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='CCA' element={<MyCCa findStudent={this.findStudent.bind(this)} student={this.state.student}/>} />

          </Route>
          <Route path="/admin" element={<AdminSideNav />} >
            <Route index element={<AdminHome studentCount={this.state.studentCount} />} />
            <Route path='upload' element={<AdminUpload createStudent={this.createStudent.bind(this)} />} />
            <Route path='view' element={<AdminViewCCA studentList={this.state.students} attendProgram={this.attendProgram.bind(this)} />} />
            <Route path='profile' element={<AdminProfile />} />
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='reset' element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    );
  }

}

export default App;
