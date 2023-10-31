import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import context from "../context";
const Signup = () => {
	let [email, setEmail] = useContext(context);
	let navigate = useNavigate();
	const [data, setData] = useState({
		fullName: "",
		companyName: "",
		email: "",
		role: "",
		department: "",
		password: "",
		confirmPassword: ""
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setEmail(data.email);
			const url = "http://localhost:3000/register";
			const { data: res } = await axios.post(url, data);
			setMsg(res.message);
			navigate("/OTPVerify");
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h2>Hi, Welcome Back</h2>
					<img src={logo} alt="logo" className={styles.logo_img} />
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h3>Sign Up</h3>
						<p>Have an account? login</p>
						<div className={styles.form_row}>
						<input
							type="text"
							placeholder="Full Name"
							name="fullName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.form_row_input}
						/>
						<input
							type="text"
							placeholder="Company Name"
							name="companyName"
							onChange={handleChange}
							value={data.companyName}
							required
							className={styles.form_row_input}
						/>
						</div>
						<div className={styles.form_row}>
						<input
							type="email"
							placeholder="Email address"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.form_row_input}
						/>
						<input
							type="text"
							placeholder="Role/Title"
							name="role"
							onChange={handleChange}
							value={data.role}
							required
							className={styles.form_row_input}
						/>

						</div>
						<div className={styles.form_row}>
						<input
							type="text"
							placeholder="Department"
							name="department"
							onChange={handleChange}
							value={data.department}
							required
							className={styles.form_row_input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.form_row_input}
						/>
						</div>
						<input
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							onChange={handleChange}
							value={data.confirmPassword}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
