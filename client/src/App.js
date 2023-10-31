import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import OTPVerify from "./components/OTPVerify";
import context from "./components/context";

function App() {
	const user = localStorage.getItem("token");
	const [email, setEmail] = useState("");
	return (
		<context.Provider value={[email,setEmail]}>
		<Routes>
			<Route path="/main" exact element={<Main />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} /> 
			<Route path="/" element={<Navigate replace to="/signup" />} />
			<Route path="/otpVerify" exact element={<OTPVerify />} /> 
		</Routes>
		</context.Provider>
	);
}

export default App;
