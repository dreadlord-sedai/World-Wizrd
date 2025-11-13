import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return <Link to="/" >
    <h2 className={styles.logo} >World Wizard</h2>
  </Link>;
}

export default Logo;
