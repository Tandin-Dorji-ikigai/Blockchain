    import React, { Component } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import LandingPage from './components/landinPage';
import RiderHome from './components/RiderHome';
import DriverHome from './components/DriverHome';
import CommunityPage from './components/Community';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import HomeNav from './components/homeNavBars';
import Login1 from './components/Login1';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import EditProfile from './components/EditProfile';
import Cookies from 'js-cookie';
import axios from 'axios';
import Web3 from 'web3';
import { RIDE_LIST_ABI, RIDE_LIST_ADDRESS } from './abi/config_trips';
import { BANNING_LIST_ABI, BANNING_LIST_ADDRESS } from './abi/config_banning';

import './App.css';
import ContactHistory from './components/ContactHistory';
import RegisterRedirect from './components/registerRedirect';
import TravelHistory from './components/DriverTravelJistory';
import DriverSignup from './components/DriverSignup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './components/ForgotPassword';


class App extends Component {
  // va navigate = useNavigate()
  componentDidMount() {
    this.loadMetaMask()
    this.loadUserDataWithCookie()
    this.loadBlockchainData()
    this.checkCookiesToKeepTractOfLogin()
    this.loadBlockchainBAnning()
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        const newAccount = accounts[0];
        this.setState({ account: newAccount });
      }
    });
    document.addEventListener('myCookieEvent', this.handleCookieChange);
  }
  checkCookiesToKeepTractOfLogin = () => {
    if (Cookies.get("jwt")) {
      this.setState({
        loggedIn: true
      })
    }
  }
  handleCookieChange = () => {
    // Cookies have changed, update the state with the new cookie values
    const cookies = Cookies.get("jwt");
    this.setState({ cookies });
  };
  componentDidUpdate(prevProps, prevState) {
    // Check if cookies have changed
    const prevCookies = JSON.stringify(prevState.cookies);
    const currentCookies = JSON.stringify(this.state.cookies);
    if (prevCookies !== currentCookies) {
      this.loadUserDataWithCookie();
    }
  }
  async loadMetaMask() {
    try {
      if (!window.ethereum)
        toast.error('No crypto wallet found. Please install it.');
      await window.ethereum.send('eth_requestAccounts').then(async () => {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        const accounts = await web3.eth.getAccounts();
        const _balance = await web3.eth.getBalance(accounts[0]);
        const ethValue = web3.utils.fromWei(_balance, 'ether');
        this.setState({ account: accounts[0], balance: ethValue });
        return accounts[0]
      })
    } catch (error) {
      console.log(error)
    }


  }
  async loadBlockchainData() {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
      const rideContract = new web3.eth.Contract(RIDE_LIST_ABI, RIDE_LIST_ADDRESS)
      this.setState({ rideContract })
      const tripRequestCount = await rideContract.methods.tripRequestCount().call()
      this.setState({ tripRequestCount })
      const trips = []
      for (var i = 0; i < tripRequestCount; i++) {
        const trip = await rideContract.methods.trips(i).call();
        trips.push(trip)
      }
      this.setState({ trips }, () => {
        console.log("trips: ", this.state.trips)
      })
    } catch (error) {
      console.error(error.message)
    }
  }
  async loadBlockchainBAnning() {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
      const banningContract = new web3.eth.Contract(BANNING_LIST_ABI, BANNING_LIST_ADDRESS)
      this.setState({ banningContract })
      const totalMember = await banningContract.methods.totalMember().call()
      this.setState({ totalMember })
      const banMembers = []
      for (var i = 1; i <= totalMember; i++) {
        const banMember = await banningContract.methods.users(i).call();
        banMembers.push(banMember)
      }
      this.setState({ banMembers }, () => {
        console.log("banMembers: ", this.state.banMembers)
      })
    } catch (error) {
      console.error(error.message)
    }
  }





  async loadUserDataWithCookie() {
    try {
      const token = Cookies.get('jwt');
      if (token) {
        await axios({
          method: 'POST',
          url: 'https://dashboard.render.com/api/v1/users/getcookiedetails',
          data: {
            token
          }
        }).then((response) => {
          this.setState({ user: response.data.data.freshUser })
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      userType: 'rider',
      user: {},
      account: "",
      balance: undefined,
      rideContract: undefined,
      loggedIn: false,
      cookies: "",
      trips: [],
      
    };
  }
  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/ridetrust' element={<HomeNav profile={this.state.user} loggedIn={this.state.loggedIn} balance={this.state.balance} rideContract={this.state.rideContract} banningContract={this.state.banningContract} />}>
            <Route path="home" element={this.state.user?.role === 'rider' ? <RiderHome rideContract={this.state.rideContract} /> : <DriverHome rideContract={this.state.rideContract} profile={this.state.user} />} />
            <Route path="contact" element={<ContactUs loggedIn={this.state.loggedIn} handleLoggedIn={this.handleLoggedIn} profile={this.state.user} />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="profile" element={<Profile profile={this.state.user} account={this.state.account} balance={this.state.balance} banningContract ={this.state.banningContract} />} />
            <Route path="profileEdit" element={<EditProfile profile={this.state.user} />} />
            <Route path="contactHistory" element={<ContactHistory rideContract={this.state.rideContract} />} />
            <Route path="travelHistory" element={<TravelHistory />} />
          </Route>
          {/* signUp and login route */}
          <Route path="/login" element={<Login1 banningContract={this.state.banningContract} handleLoggedInStatus={(value) => this.setState({ loggedIn: value })} banMembers = {this.state.banMembers} />} />
          <Route path="/signup" element={<SignUp banningContract={this.state.banningContract} />} />
          <Route path="/driverSignup" element={<DriverSignup metaAccount={this.state.account} banningContract={this.state.banningContract} />} />
          <Route path="/signupRedirect" element={<RegisterRedirect />} />
          <Route path="/resetPassword" element={<ForgotPassword />} />

        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;