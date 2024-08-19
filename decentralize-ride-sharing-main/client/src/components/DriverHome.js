import React, { Fragment, useState, useEffect, useRef } from "react";
import './css/DriverHome.css';
import Footer from "./footer";
import { Link } from "react-router-dom";
import axios from "axios";
// Map components
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Tooltip, Popup, Circle } from 'react-leaflet'
// map marker
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Cookies from 'js-cookie';
import Web3 from 'web3';
import { ToastContainer, toast } from 'react-toastify';

const ZOOM_LEVEL = 17;

const MAP_ICON = L.icon({
  iconUrl: "/images/icon.png",
  iconSize: [30, 30],
});



function RiderHome({ rideContract,profile}) {
  const [user, setUser] = useState(null);
  const toastOption = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const USER_ICON = L.icon({
    iconUrl: `/images/user/${profile.photo}`,
    iconSize: [30, 30]
  });
  const [center, setCenter] = useState({
    lat: null,
    lon: null
  });

  const [location, setLocation] = useState([]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const loadUserDataWithCookie = async () => {
    try {
      const token = Cookies.get('jwt');
      if (token) {
        const response = await axios.post('http://localhost:4001/api/v1/users/getcookiedetails', {
          token
        });
        setUser(response.data.data.freshUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const acceptRideRequest = async (e, riderAccount, _id) => {
    e.preventDefault();
    // console.log(banMembers)
    // if(controlAcceptingRideRequest){
    //     return
    // }
    // alert(riderAccount)
    if (!window.ethereum) {
      toast.error('MetaMask is not installed.', toastOption);
      return;
    }
    // alert("second")
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    // alert(accounts[0])
    if (accounts[0].toLowerCase() !== user?.account.toLowerCase()) {
      toast.error("Select your own account to make a transaction", toastOption);
      return;
    }
    try {
      await rideContract.methods.getLatestTripForRider().call({ from: riderAccount }).then(async (targetLocationIndex) => {
        await rideContract.methods.acceptRequest(parseInt(targetLocationIndex) + 1).send({ from: accounts[0] }).then(async (receipt) => {
          const locationRes = await axios({
            method: "PATCH",
            url: `http://localhost:4001/api/v1/location/${_id}`,
            data: {
              status: "accepted",
              driverId: user?._id
            }
          });
          if (locationRes.data.status === "success") {
            toast.success("Request accepted", toastOption);
            setTimeout(() => {
              window.location.reload(true);
            }, 3000);
          }
        });
      });
    } catch (error) {
      if (error.message.includes("revert The status should be pending" || "The status should be pending")) {
        toast.error("Already accepted the ride ", toastOption);
      } else if (error.message.includes("revert previous trip is pending" || "previous trip is pending")) {
        toast.error("Previous Ride Is Incompleted", toastOption);
      } else if (error.message.includes("revert previous trip is pending" || "previous trip is pending")) {
        toast.error("Previous Ride Is Incompleted", toastOption);

      } else {
        console.log(error);
      }

    }
  };

  const loadLocationData = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/v1/location');
      const locationData = response.data.data.map((data) => data.status === "pending" && ({
        _id: data._id,
        dropOffLocation: data.dropOffLocation,
        pickUpLocation: data.pickUpLocation,
        ownerData: data.ownerData,
        pickUpTime: data.pickUpTime,
        position: {
          lat: parseFloat(data.lat),
          lon: parseFloat(data.lon)
        }
      }));

      setLocation(locationData);
      // console.log(locationData)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLocation();
    loadLocationData();
    loadUserDataWithCookie();
  }, []);

  const CustomMarker = ({ position, tooltip, popUP, dropOffLocation, pickUpLocation, riderAccount, _id }) => (
    <Marker position={position} icon={MAP_ICON} className="map-marker">
      <Tooltip permanent className="custom-tooltip">
        To {dropOffLocation}
      </Tooltip>
      <Popup className="user-popUp-container">
        <div className="user-custom-pop">
          <div className="user-custom-pop-header">Ride Available</div>
          <div className="destination-container">
            <div className="destination-item">
              <div>
                From:
              </div>
              <div>
                {pickUpLocation}
              </div>
            </div>
            <div className="destination-item">
              <div>
                To:
              </div>
              <div>
                {dropOffLocation}
              </div>
            </div>
            <div className="destination-item">
              <div>
                Pick Up Time:
              </div>
              <div>
                {tooltip}
              </div>
            </div>
          </div>
          <Link to="/profile" className='community-user-link' onClick={scrollToTop}>
            <div className='community-user-card map-user-card'>
              <img src='images/user.png' alt='user' className='map-user-image' />
              <div className='communit-user-name'>
                {popUP ? popUP : ""}
              </div>
            </div>
          </Link>
          <button onClick={(e) => acceptRideRequest(e, riderAccount, _id)} className="map-accept-btn">
            Accept
          </button>
        </div>
      </Popup>
    </Marker>
  );

  const myRef = useRef(0);

  const scrollToRef = () => {
    myRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="hero-section">
        <div className="container">
          <div className="driver-hero-section">
            <div className="driver-hero-header">
              Drive with Confidence on RideTrust
            </div>
            <div className="driver-hero-content">
              Earn more, connect with riders, and enjoy a seamless experience.
            </div>
            <button className="bookNow-button about-us-join-btn mt-4" onClick={scrollToRef}>
              View Ride Requests
            </button>
          </div>
        </div>
      </div>
      <div ref={myRef}></div>
      {center.lat && center.lon && (
        <div className="map-container">
          <div>
            Click on the location Icon to view ride details
          </div>
          <MapContainer center={center} zoom={ZOOM_LEVEL} className="user-map" scrollWheelZoom={false}>
            <TileLayer
              url={process.env.REACT_APP_MAP_STYLE}
              attribution={process.env.REACT_APP_MAP_ATTRIBUTION}
            />

            <Circle center={center} fillColor="blue" radius={200} />
            <MarkerClusterGroup>
              <Marker position={center} icon={USER_ICON}></Marker>
              {location.map((marker) => marker && (
                <CustomMarker
                  key={`${marker.position.lat}-${marker.position.lon}`}
                  position={marker.position}
                  tooltip={marker.pickUpTime}
                  popUP={marker.ownerData?.name}
                  dropOffLocation={marker.dropOffLocation}
                  pickUpLocation={marker.pickUpLocation}
                  riderAccount={marker.ownerData?.account}
                  _id={marker._id}
                />
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      )
      }
      <div className="home-contact-guide">
        <div className="container home-contact-content">
          <div>
            <h4>
              Safety for all means looking out for our riders
            </h4>
          </div>
          <div>
            <div className="contactUs-content">
              We'll always treat you with respect and look out for your safety. We do this by maintaining high standards, which start before your very first ride. Our proactive safety features are always on. And anytime, night or day, we offer real help from real humans.
            </div>
          </div>
          <button className="bookNow-button">
            Contact us
          </button>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}

export default RiderHome;
