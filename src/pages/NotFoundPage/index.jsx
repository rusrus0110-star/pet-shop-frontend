import { Link } from "react-router-dom";

import { ROUTES } from "../../shared/config/routes";
import dogImage from "../../assets/images/notFoundPage/404-dog.png";

import styles from "./style.module.css";

function NotFoundPage() {
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.codeBlock} aria-hidden="true">
            <span className={styles.digit}>4</span>

            <img src={dogImage} alt="" className={styles.dog} />

            <span className={styles.digit}>4</span>
          </div>

          <h1 className={styles.title}>Page Not Found</h1>

          <p className={styles.text}>
            We&apos;re sorry, the page you requested could not be found.
          </p>

          <p className={styles.text}>Please go back to the homepage.</p>

          <Link to={ROUTES.HOME} className={styles.button}>
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;