import React, { Fragment, useState, useEffect } from 'react';
import './css/Profile.css';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Footer from './footer';

export default function Profile(props) {

    const accountNumber = props.profile?.account;
    const truncatedAccount = `${accountNumber?.slice(0, 5)}...${accountNumber?.slice(-4)}`;
    const [copied, setCopied] = useState("Copy");

    const handleCopyAccount = () => {
        navigator.clipboard.writeText(accountNumber)
            .then(() => {
                setCopied("Copied!");
                setTimeout(() => {
                    setCopied("Copy");
                }, 5000);
            })
            .catch((error) => {
                setCopied("Error");
                setTimeout(() => {
                    setCopied("Copy");
                }, 5000);
            });
    };
    const [rating, setRating] = useState(0)
    useEffect(() => {
        const getUserRating = async () => {
            const totalMember = await props.banningContract?.methods.totalMember().call();
            const banMembers = [];
            for (let i = 1; i <= totalMember; i++) {
                const banMember = await props.banningContract?.methods.users(i).call();
                banMembers.push(banMember);
            }
            for (let i = 0; i < totalMember; i++) {
                if (banMembers[i].userAddress === props.profile?.account) {
                    setRating(banMembers[i].rating);
                    break;
                }
            }
        };

        const timer = setTimeout(() => {
            getUserRating();
        }, 3000);

        return () => clearTimeout(timer); // Clear the timeout on component unmount
    }, [props.banningContract, props.profile?.account]);





    const renderStars = () => {
        const starCount = Math.round(rating);
        const stars = [];

        for (let i = 0; i < starCount; i++) {
            stars.push(<Icon key={i} icon="material-symbols:star-rounded" className='profile-star' />);
        }

        return stars;
    };


    //scroll to top when clicking on link
    function scroolToTop() {
        window.scrollTo(0, 0);
    }


    return (
        <Fragment>
            <div>
                <div className='profile-wrapper container'>
                    <div className='user-profile-imgbio-container'>
                        <div>
                            <img src={`/images/user/${props.profile?.photo}`} alt='user' className='profile-user-img' />
                        </div>
                        <div className='user-profile-bio'>
                            <h4>Bio</h4>
                            <div className='profile-bio'>
                                {props.profile?.bio}
                            </div>
                        </div>
                        <div className='profile-edit-button'>
                            <Icon icon="material-symbols:edit" className='profile-edit-icon' />
                            <Link to='/ridetrust/profileEdit' style={{ color: "#01D28E" }} onClick={scroolToTop}>
                                <div>
                                    Edit Profile
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='user-profile-detail-container'>
                        <div className='profile-username-container'>
                            <div className='profile-username'>
                                {props.profile.name}
                            </div>
                            <div className='profile-location'>
                                <Icon icon="material-symbols:location-on-rounded" />
                                <div>
                                    {props.profile?.address}
                                </div>
                            </div>
                        </div>
                        <div className='user-profile-user-type'>
                            RideTrust {props.profile?.role}
                        </div>
                        <div className='user-profile-acc'>
                            <Icon icon="mdi:ethereum" className='eth-icon' />
                            <div className='profile-account' onClick={handleCopyAccount}>
                                {truncatedAccount}
                            </div>
                            <div className='profile-acc-copy'>
                                {copied}
                            </div>
                        </div>
                        <div className='profile-rate'>
                            RATING
                        </div>
                        <div className='user-profile-rating'>
                            <div className='user-profile-rating-number'>
                                {rating}
                            </div>
                            <div className='user-profile-rating-star'>
                                {renderStars()}
                            </div>
                        </div>

                        <div className='user-social'>
                            Social
                        </div>
                        <div className='user-profile-social'>
                            <a href="https://www.instagram.com/your_instagram_url" target="_blank" rel="noopener noreferrer">
                                <Icon icon="mdi:instagram" className='profile-social-ig' />
                            </a>
                            <a href="https://www.facebook.com/your_facebook_url" target="_blank" rel="noopener noreferrer">
                                <Icon icon="ant-design:facebook-filled" className='profile-social-fb' />
                            </a>
                        </div>

                        <div className='user-profile-information'>
                            <div className='user-profile-info-header'>
                                <Icon icon="mdi:user" />
                                About
                            </div>

                            <div className='profile-contact-info'>
                                CONTACT INFORMATION
                            </div>
                            <div className='user-profile-contact-info'>
                                <div className='contact-attribute-container'>
                                    <span className='contact-attribute'>Phone :</span>
                                    <span className='contact-attribute'>Email :</span>
                                    <span className='contact-attribute'>Address :</span>
                                </div>
                                <div className='contact-value-container'>
                                    <span className='contact-value'>{props.profile.phoneNumber}</span>
                                    <span className='contact-value'>{props.profile.email}</span>
                                    <span className='contact-value'>{props.profile.address ? props.profile.address : "......................"}</span>
                                </div>
                            </div>
                            {(props.profile?.role === "driver" ? (
                                <>
                                    <div className='profile-contact-info'>
                                        VEHICLE INFORMATION
                                    </div>
                                    <div className='user-profile-contact-info'>
                                        <div className='contact-attribute-container'>
                                            <span className='contact-attribute'>Vehicle Model :</span>
                                            <span className='contact-attribute'>Vehicle Color :</span>
                                            <span className='contact-attribute'>Plate Number :</span>
                                        </div>
                                        <div className='contact-value-container'>
                                            <span className='contact-value'>2003</span>
                                            <span className='contact-value'>blue</span>
                                            <span className='contact-value'>BP-10123</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            ))}

                            {/* <Link to='/travelHistory'>
                                <button className='signup-button'>View History</button>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </Fragment>
    )
}