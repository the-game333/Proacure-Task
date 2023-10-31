import styles from "./styles.module.css";
import user from "../../images/user.png";
import OtpInput from "otp-input-react";
import { useState, useContext } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import context from "../context";

const OTP = () => {
  let [email,setEmail] = useContext(context);
  let navigate = useNavigate();
  const { state } = useLocation()
	const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
 
  
  async function onOTPVerify(props) {
    try {
      console.log(email);
			const url = "http://localhost:3000/verify";
			const { data: res } = await axios.post(url, {email,otp});
      navigate("/login");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
  }

	return (
    <div className={styles.main_container}>
      <h1>Please enter the OTP</h1>
      <p className="">The One-Time Password has been sent to your email Id </p>
			<OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className={styles.otp_input}
                ></OtpInput>
                <button onClick={onOTPVerify}
                className={styles.green_btn}
                >
                  Continue
                </button>
                {error && <span>{error}</span>}
                <p className="">Didn't receive code? <span className="font-bold text-sm text-yellow-400 text-center">Click to Resend</span></p>
		</div>
	);
};

export default OTP;
