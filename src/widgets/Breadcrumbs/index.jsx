import { Link } from "react-router-dom";

import styles from "./style.module.css";

function Breadcrumbs({ items }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className={styles.segment}>
            {item.to && !isLast ? (
              <Link to={item.to} className={styles.item}>
                {item.label}
              </Link>
            ) : (
              <span className={`${styles.item} ${styles.current}`}>
                {item.label}
              </span>
            )}

            {!isLast ? (
              <span className={styles.connector} aria-hidden="true" />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
