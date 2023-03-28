import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useTranslation } from "react-i18next";
import i18n from './translations/i18n';
import ProgressBar from 'react-bootstrap/ProgressBar'


function App() {
  const { t } = useTranslation();

  const [countdownToggle, setCountdownToggle] = useState(false);
  const [endTimeSeconds, setEndTimeSeconds] = useState(0);
  const [presaleEndSec, setPresaleEndSec] = useState(false);
  const [referId, setReferId] = useState("");
  const [email, setEmail] = useState('');
  const [telegramUserNmme, setTelegramUserName] = useState('')

  const [language, setLanguage] = useState('en');

  const [soldTokenNumber, updateSoldTokenNumber] = useState(0);
  const [progressbarToggle, setProgressbarToggle] = useState(false);

  const [soldAmount, setSoldAmount] = useState(0);
  const [presaleTokenNumber, setPresaleTokenNumber] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [maximumExchange, setMaximumExchange] = useState(0);
	const [minimumExchange, setMinimumExchange] = useState(0);

  const handleOnclick = (e) => {
    console.log(e, e.target.value, "changed value")
    e.preventDefault();
    setLanguage(e.target.value);

    localStorage.setItem('slamLanguage', e.target.value);
    i18n.changeLanguage(e.target.value);
  }

  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 90,
    strokeWidth: 5
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div className="timeDemention">{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + endTimeSeconds; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  

  useEffect(() => {
    if (localStorage.getItem('slamLanguage'))
      setLanguage(localStorage.getItem('slamLanguage'));

    // axios.get(process.env.REACT_APP_SLAMBACKEND+'api/manages')
    // .then(res=> {
    //     setEndTimeSeconds(res.data.countDownSec)

    //     if(res.data.presaleEndSec > 0) {
    //       setEndTimeSeconds(res.data.presaleEndSec)
    //       setPresaleEndSec(true)
    //     }else {
    //       setEndTimeSeconds(res.data.countDownSec)
    //       setPresaleEndSec(false)
    //     }

    //     if(res.data.countdownToggle == "Yes")
    //       setCountdownToggle(true)
    //     else 
    //       setCountdownToggle(false)
    //   });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams > 0 || urlParams != "")
      setReferId(urlParams.get('referId'));
    else
      setReferId("");
    
    manageData()
  }, []);

  const validateEmail = (_email) => {
    return _email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const subscribe = async () => {
    if (validateEmail(email)) {
      axios.post(process.env.REACT_APP_SLAMBACKEND + 'api/subscribe', {
        email: email
      }).then((res) => {
        alert('Successfully subscribe! \nPlease check your email!')
        console.log('res', res)
      }).catch((error) => {
        alert('failed subscribe')
      })
    } else {
      alert('Please input valid email address')
    }
  }

  const manageData = async () => {
		const res = await axios.get(process.env.REACT_APP_SLAMBACKEND + 'api/manages');
		setSoldAmount(res.data.soldAmount);
		setPresaleTokenNumber(res.data.presaleTokenNumber);
		setTokenPrice(res.data.tokenPrice);

		setMaximumExchange(res.data.maximumExchange);
		setMinimumExchange(res.data.minimumExchange);
		updateSoldTokenNumber(res.data.currentSoldAmount);

		if (res.data.progressbarToggle === "Yes")
      setProgressbarToggle(true);
    else
      setProgressbarToggle(false);
	}

  const options = [
    {
      label: 'EN',
      value: 'en',
      image: './img/England_Flag.png',
    },
    {
      label: 'CH',
      value: 'zh',
      image: '/img/China_Flag.png',
    }
  ];

  return (
    <div className="App">
      <nav>
        <div className="mobile-back" style={{ width: size[0], height: size[1] }}></div>
        <div className="nav-header">
          <a className="nav-logo" href="/">
            <img src='/img/Slamcoin_icon.svg'/>
            <img src="/img/Slamchat_logo.svg" className="nav-dog" />
          </a>
        </div>
      </nav>
      
      <img src='/img/section-sphere.png' className='section-sphere'/>
      <section className="Rectangle-Copy-14 hidden_mobile">
        <div className="center-box">
          {/* <div className="title">{t('EasiliyTitle')}  &nbsp; <font className="easily_title">{t('EasiliyTitle_Sub')}</font> </div> */}
          <div className="title">{t('EasiliyTitle')}</div>
          <div className="content">This program is strictly for our Slamfam old investor. <br/>Enter your telegram username and email and wait for a confirmation deposit.</div>
          <div className="sendTelegramUserName">
            <input type="text" placeholder={t('TelegramUserName')} value={telegramUserNmme} onChange={(e) => { setTelegramUserName(e.target.value) }} />
          </div>
          <div className="sendEmail">
            <input type="text" placeholder={t('Email')} value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <div className="btnSubscribe" onClick={subscribe}>CLAIM</div>
          </div>
          <img src='/img/slamcoin-bot.png' className='slamcoin-bot'/>
        </div>
        <img src="/img/coins.png" className="right-floating" />
      </section>
      <div className="note-box">
            <div className='note1'>Please note: that if you enter a wrong telegram username and email you will not be able to receive your bonus.</div>
            <div className='note2'>Once you have entered the correct info, you will receive your bonus within 48 hours.</div>
            <div className='note3'>Enjoy your bonus!</div>
          </div>

    </div>
  );
}

export default App;
