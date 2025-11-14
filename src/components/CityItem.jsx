/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date } = city;

  return (
    <li>
      <Link
        to={`/app/cities/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji} role="img" aria-label={cityName}>
          {emoji}
        </span>
        <span className={styles.cityName}>{cityName}</span>
        <span className={styles.date}>{formatDate(date)}</span>
      </Link>
    </li>
  );
}

export default CityItem;
