import { Link } from "react-router-dom";

import styles from "./style.module.css";

function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumbs" className={styles.breadcrumbs}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className={styles.item}>
            {item.to && !isLast ? (
              <Link to={item.to} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}

            {!isLast ? <span className={styles.separator}>/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
