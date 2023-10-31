import styles from "./styles.module.css";
import user from "../../images/user.png";
const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<img src={user} alt="user" />
			<h1>Hi you are logged in !!</h1>
		</div>
	);
};

export default Main;
