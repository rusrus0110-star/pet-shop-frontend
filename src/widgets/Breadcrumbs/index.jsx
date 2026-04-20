import { Link } from "react-router-dom";
import styles from "./style.module.css";

function Breadcrumbs({ items = [] }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      {items.map((item) => {
        const key = `${item.label}-${item.to ?? "current"}`;

        if (item.to) {
          return (
            <Link key={key} to={item.to} className={styles.item}>
              {item.label}
            </Link>
          );
        }

        return (
          <span
            key={key}
            className={`${styles.item} ${styles.current}`}
            aria-current="page"
          >
            {item.label}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
