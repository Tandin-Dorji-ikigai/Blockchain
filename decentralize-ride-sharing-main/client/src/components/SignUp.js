import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Web3 from 'web3';
import 'react-toastify/dist/ReactToastify.css';
import {BANNING_LIST_ABI,BANNING_LIST_ADDRESS} from "./../abi/config_banning"

export default function SignUp() {
  const [banningContract, setBanningContract] = useState(null);

  useEffect(() => {
    const loadBlockchainBanning = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const banningContract = new web3.eth.Contract(BANNING_LIST_ABI, BANNING_LIST_ADDRESS);
        setBanningContract(banningContract);
      } catch (error) {
      }
    };

    loadBlockchainBanning();
  }, []);


  const dzongkhags = [
    "Bumthang",
    "Chukha",
    "Dagana",
    "Gasa",
    "Haa",
    "Lhuentse",
    "Mongar",
    "Paro",
    "Pemagatshel",
    "Punakha",
    "Samdrup Jongkhar",
    "Samtse",
    "Sarpang",
    "Thimphu",
    "Trashigang",
    "Trashiyangtse",
    "Trongsa",
    "Tsirang",
    "Wangdue",
    "Zhemgang"
  ]
  const gewogs = [
    ["Chhoekhor",
      "Chhume",
      "Tang",
      "Ura"
    ],
    ["Bjachho",

      "Bongo",
      "Chapcha"
      ,
      "Darla",
      "Dungna"
      ,
      "Geling"
      ,
      "Getana"
      ,
      "Lokchina"
      ,
      "Metakha"
      ,
      "Phuentsholing"
      ,
      "Sampheling"],
    [
      "Dorona"
      ,
      "Drujegang"
      ,
      "Gesarling"
      ,
      "Goshi"
      ,
      "Kana"
      , "Karmaling",
      "Khebisa"
      ,
      "Lajab"
      ,
      "Lhamoi", "Zingkha",

      "Nichula"
      ,
      "Trashiding"
      ,
      "Tsangkha"
      ,
      "Tsendagang"
      ,
      "Tseza"
    ],
    [
      "Khamaed"
      ,
      "Khatoe"
      ,
      "Laya"
      ,
      "Lunana"
    ],
    [
      "Bji"
      ,
      "Gakiling"
      ,
      "Katsho"
      ,
      "Samar"
      ,
      "Sangbay"
      ,
      "Uesu"
    ],
    [
      "Gangzur"
      ,
      "Khoma"
      ,
      "Jarey"
      ,
      "Kurtoed"
      ,
      "Menbi"
      ,
      "Metsho"
      ,
      "Minjay"
      ,
      "Tsenkhar"

    ],
    [
      "Balam"
      ,
      "Chali"
      ,
      "Chaskhar"
      ,
      "Drametse"
      ,
      "Drepong"
      ,
      "Gongdue"
      ,
      "Jurmey"
      ,
      "Kengkhar"
      ,
      "Mongar"
      ,
      "Narang"
      ,
      "Ngatshang"
      ,
      "Saling"
      ,
      "Shermuhoong"
      ,
      "Silambi"
      ,
      "Thangrong"
      ,
      "Tsakaling"
      ,
      "Tsamang"
    ],
    [
      "Dokar"
      ,
      "Dopshari"
      ,
      "Doteng"
      ,
      "Hungrel"
      ,
      "Lamgong"
      ,
      "Lungnyi"
      ,
      "Naja"
      ,
      "Shapa"
      ,
      "Tsento"
      ,
      "Wangchang"
    ],
    [
      "Chimoong"
      ,
      "Chokhorling"
      ,
      "Chongshing"
      ,
      "Dechheling"
      ,
      "Dungmaed"
      ,
      "Khar"
      ,
      "Nanong"
      ,
      "Norbugang"
      ,
      "Shumar"
      ,
      "Yurung"
      ,
      "Zobel"
    ],
    [
      "Barp"
      ,
      "Chhubug"
      ,
      "Dzomi"
      ,
      "Goenshari"
      ,
      "Guma"
      ,
      "Kabisa"
      ,
      "Lingmukha"
      ,
      "Shenga Bjemi"
      ,
      "Talog"
      ,
      "Toepisa"
      ,
      "Toewang"
    ],
    [
      "Dewathang"
      ,
      "Gomdar"
      ,
      "Langchenphu"
      ,
      "Lauri"
      ,
      "Martshala"
      ,
      "Orong"
      ,
      "Pemathang"
      ,
      "Phuntshothang"
      ,
      "Samrang"
      ,
      "Serthi"
      ,
      "Wangphu"
    ],
    [
      "Dungtoe"
      ,
      "Dophoogchen"
      ,
      "Duenchukha"
      ,
      "Namgaychhoeling"
      ,
      "Norbugang"
      ,
      "Norgaygang"
      ,
      "Pemaling"
      ,
      "Phuentshogpelri"
      ,
      "Samtse"
      ,
      "Sangngagchhoeling"
      ,
      "Tading"
      ,
      "Tashicholing"
      ,
      "Tendruk"
      ,
      "Ugentse"
      ,
      "Yoeseltse"
    ],
    [
      "Chhuzagang"
      ,
      "Chhudzom"
      ,
      "Dekiling"
      ,
      "Gakiling"
      ,
      "Gelephu"
      ,
      "Jigmechholing"
      ,
      "Samtenling"
      ,
      "Senggey"
      ,
      "Sherzhong"
      ,
      "Shompangkha"
      ,
      "Tareythang"
      ,
      "Umling"
    ],
    [
      "Chang"
      ,
      "Darkala"
      ,
      "Genye"
      ,
      "Kawang"
      ,
      "Lingzhi"
      ,
      "Mewang"
      ,
      "Naro"
      ,
      "Soe"
    ],
    [
      "Bartsham"
      ,
      "Bidung"
      ,
      "Kanglung"
      ,
      "Kangpar"
      ,
      "Khaling"
      ,
      "Lumang"
      ,
      "Merag"
      ,
      "Phongmed"
      ,
      "Radi"
      ,
      "Sagteng"
      ,
      "Samkhar"
      ,
      "Shongphoog"
      ,
      "Thrimshing"
      ,
      "Uzorong"
      ,
      "Yangnyer"
    ],
    [
      "Bumdeling"
      ,
      "Jamkhar"
      ,
      "Khamdang"
      ,
      "Ramjar"
      ,
      "Toetsho"
      ,
      "Tomzhang"
      ,
      "Yalang"
      ,
      "Yangtse"
    ],
    ["Dragteng"
      ,
      "Korphoog"
      ,
      "Langthil"
      ,
      "Nubi"
      ,
      "Tangsibji"],
    [
      "Barshong"
      ,
      "Dunglegang"
      ,
      "Gosarling"
      ,
      "Kikhorthang"
      ,
      "Mendrelgang"
      ,
      "Patshaling"
      ,
      "Phuntenchu"
      ,
      "Rangthangling"
      ,
      "Semjong"
      ,
      "Sergithang"
      ,
      "Tsholingkhar"
      ,
      "Tsirangtoe"
    ]
    , [
      "Athang"
      ,
      "Bjendag"
      ,
      "Darkar"
      ,
      "Dangchu"
      ,
      "Gangteng"
      ,
      "Gasetsho Gom"
      ,
      "Gasetsho Wom"
      ,
      "Kazhi"
      ,
      "Nahi"
      ,
      "Nyisho"
      ,
      "Phangyul"
      ,
      "Phobji"
      ,
      "Ruepisa"
      ,
      "Sephu"
      ,
      "Thedtsho"
    ]
    , [

      'Bardo'
      ,
      "Bjoka"
      ,
      "Goshing"
      ,
      "Nangkor"
      ,
      "Ngangla"
      ,
      "Phangkhar"
      ,
      "Shingkhar"
      ,
      "Trong"
    ]
  ]


  const [firstData, setFirstData] = useState(true);
  const [secondData, setSecondData] = useState(false);
  const [thirdData, setThirdData] = useState(false);
  const handleNext = () => {
    if (firstData) {
      setFirstData(false);
      setSecondData(true);
    } else if (secondData) {
      setSecondData(false);
      setThirdData(true);
    }
  };
  //input data
  const [nameFirst, setNameFirst] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [dzongkhag, setDzongkhag] = useState('');
  const [gewog, setGewog] = useState('');
  const [profilePicture, setProfilePicture] = useState(null)

  // backEnd
  const navigate = useNavigate()
  const toastOption = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (thirdData) {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          // alert("asdsad")
          // alert(accounts[0])
          if (accounts[0]) {
            const accountRes = await Axios.get(`https://dashboard.render.com/api/v1/users/searchAccount/${accounts[0]}`);
            if (accountRes.data.data === null) {
              const formData = new FormData();
              formData.append('photo', profilePicture);
              formData.append('email', email);
              formData.append('name', nameFirst);
              formData.append('phoneNumber', phoneNumber);
              formData.append('password', password);
              formData.append('passwordConfirm', confirmPassword);
              formData.append('account', accounts[0]);
              formData.append('country', country);
              formData.append('dzongkhag', dzongkhag);
              formData.append('gewog', gewog);
              const response = await Axios.post('https://dashboard.render.com/api/v1/users/signup', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              console.log("response=====", response.data);
              if (response.data.status === 'success') {
                await banningContract?.methods.registerUser().send({ from: accounts[0] }).then(() => {
                  toast.success("Registered successfully", toastOption);
                  setTimeout(() => {
                    navigate("/login");
                  }, 3000);
                })
              }
            } else {
              toast.error("Digital Wallet already taken. Please change the wallet.", toastOption);
            }
          } else {
            toast.error("Please login to your Digital Wallet", toastOption);
          }
        } else {
          toast.error('MetaMask is not installed.', toastOption);
        }
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
      toast.error(err.message,toastOption);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <div className="login-logo-container">
          <img
            src="images/DarkLogo.jpeg"
            alt=""
            className="login-logo"
          />

          <h2 className="login-logo-name">
            Ride<span>Trust</span>
          </h2>
          <p className="text-center " style={{ color: "#05497C" }}>
            Already a member?{" "}
            <Link to="/login" style={{ color: "#01D28E" }}>
              Login
            </Link>
          </p>
        </div>
        <div className="login-form-container driver-sign-up-form">
          <div className='signup-nav'>
            <div className={`signup-nav-item ${firstData ? 'active' : ''}`} onClick={() => {
              setFirstData(true);
              setSecondData(false);
              setThirdData(false);
            }}>1</div>
            <div className={`signup-nav-item ${secondData ? 'active' : ''}`} onClick={() => {
              setFirstData(false);
              setSecondData(true);
              setThirdData(false);
            }}>2</div>
            <div className={`signup-nav-item ${thirdData ? 'active' : ''}`} onClick={() => {
              setFirstData(false);
              setSecondData(false);
              setThirdData(true);
            }}>3</div>
          </div>
          <form className="login-form sign-up-form" onSubmit={(e) => {
            e.preventDefault();
          }}>
            <h2 className="login-text">
              Sign up for RideTrust
            </h2>
            {firstData && (
              <>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="First name"
                      value={nameFirst}
                      onChange={(e) => setNameFirst(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      aria-label="Last name"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputPassword4" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputPassword4" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword5"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}
            {secondData && (
              <>
                <div className="col-md-12">
                  <label htmlFor="license" className="form-label">Profile Picture</label>
                  <input className="form-control" accept="image/*" type="file" name="photo" id="formFile" onChange={(e) => setProfilePicture(e.target.files[0])} />
                </div>
                <div className="col-md-12">
                  <label htmlFor="license" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </>
            )}
            {thirdData && (
              <>
                <label htmlFor="location" className="form-label signup-location">Where Are You From?</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option selected>Select Country</option>
                  <option value="Bhutan">Bhutan</option>
                </select>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={dzongkhag}
                  onChange={(e) => {
                    setDzongkhag(e.target.value);
                  }}
                >
                  <option disabled value="">
                    Select Dzongkhag
                  </option>
                  {dzongkhags.map((dzongkhagOption) => (
                    <option key={dzongkhagOption} value={dzongkhagOption}>
                      {dzongkhagOption}
                    </option>
                  ))}
                </select>

                {dzongkhag && (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={gewog}
                    onChange={(e) => setGewog(e.target.value)}
                  >
                    <option disabled value="">
                      Select Gewog
                    </option>
                    {gewogs[dzongkhags.indexOf(dzongkhag)].map((gewogOption) => (
                      <option key={gewogOption} value={gewogOption}>
                        {gewogOption}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
            <div className="form-group">
              {thirdData ? <button onClick={(e) => thirdData && handleSubmit(e)} type="submit" className="signup-button login-form-button" >
                Submit
              </button> :
                <button type="submit" className="signup-button login-form-button" onClick={handleNext}>
                  Next
                </button>}
            </div>
          </form>
        </div>
      </div >
    </>
  );
}
