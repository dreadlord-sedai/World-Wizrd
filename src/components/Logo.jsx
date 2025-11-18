import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logo} aria-label="World Wizard home">
      <span className={styles.textLogo}>World Wizard</span>
    </Link>
  );
}

export default Logo;
