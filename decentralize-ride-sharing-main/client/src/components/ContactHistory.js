import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/ContactHistory.css';
import Footer from "./footer";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function ContactHistory() {
  const toastOption = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [writeBackModal, setWriteBackModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactData, setContactData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [reply, setReply] = useState("");

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleShow = (id) => {
    setModalIsOpen(true);
  };

  const WritehandleClose = () => {
    setWriteBackModal(false);
  };

  const WritehandleShow = () => {
    setWriteBackModal(true);
  };

  const handleCloseAndShowWrite = () => {
    handleClose();
    WritehandleShow();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const getContactHistory = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/v1/contact");
      setContactData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContactHistory();
  }, []);

  const getContact = async (id) => {
    handleShow();
    console.log(id);

    try {
      const response = await axios.get(`http://localhost:4001/api/v1/contact/${id}`);
      if (response.data) {
        setModalData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendContactReply = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:4001/api/v1/contact/replyContact',
        data: {
          email: modalData.email,
          reply: reply,
        }
      });

      if (response.data.success === true) {
        toast.success("Reply sent successfully", toastOption);
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      } else {
        toast.error("Reply sending failed", toastOption);
      }
    } catch (error) {
      toast.error("An error occurred while sending the reply", toastOption);
      console.error(error);
    }
  };

  const filteredData = contactData.filter((contact) =>
    contact.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <div className="container contact-container">
        <div className="row p-4">
          <div className="col-md-6 col-sm-6 d-flex align-items-left justify-content-start mb-2 mb-md-0">
            <nav className="navbar navbar-light">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            </nav>
          </div>
          <div className="col-md-6 col-sm-6 d-flex align-items-center justify-content-end">
            <h5 className="FeedBack m-0">
              Contact Us
              <span style={{ color: "#01D28E" }}> HISTORY</span>{" "}
            </h5>
          </div>
        </div>
        <div className="row table-responsive mb-5">
          <table className="table custom-table">
            <thead className="thead-blue">
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((contact) => {
                const date = new Date(contact.createdAt);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                return (
                  <tr key={contact._id}>
                    <td>{`${day}-${month}-${year}`}</td>
                    <td>{contact.firstname}</td>
                    <td>{contact.email}</td>
                    <td className="forth">
                      {!contact.replied && (
                        <Link onClick={() => getContact(contact._id)}>View</Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div >

      <Modal show={modalIsOpen} onHide={handleClose} animation={false} size="lg">
        <Modal.Body>
          <div className="written-contact-container">
            {modalData ? (
              <>
                <p><strong>From : </strong> {modalData.firstname}</p>
                <p><strong>Email : </strong> {modalData.email}</p>
                <p><strong>Subject : </strong>{modalData.subject}</p>
                <p><strong>Message </strong></p>
                <p>{modalData.message}</p>
                {!modalData.replied && (
                  <button className="btn text-light" onClick={handleCloseAndShowWrite} style={{ borderRadius: '5px', backgroundColor: '#01D28E' }}>
                    Write Back
                  </button>
                )}
              </>
            ) : (
              <p>Loading contact data...</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='close-button' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={writeBackModal} onHide={WritehandleClose} animation={false} size='lg'>
        <Modal.Body>
          <div className='cancel-ride-form-container '>
            <form className="rider-feedback-form contact-write-back">
              <div>
                <div className="col-md-12">
                  <textarea className="form-control" rows="10" onChange={(event) => setReply(event.target.value)}></textarea>
                </div>
              </div>
              <div className="mt-5 feedback-submit-button">
                <button className="signup-button w-50" onClick={(e) => {
                  e.preventDefault();
                  sendContactReply();
                }}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='close-button' onClick={WritehandleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}
