import { Link } from "react-router-dom";

import heroBanner from "../../assets/images/hero/hero-banner.svg";
import CategoriesPreview from "../../widgets/CategoriesPreview";
import DiscountBanner from "../../widgets/DiscountBanner";
import { ROUTES } from "../../shared/config/routes";

import styles from "./style.module.css";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <img
          src={heroBanner}
          alt="Amazing discounts on pets products"
          className={styles.heroImage}
        />

        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <h1 className={styles.title}>Amazing Discounts on Pets Products!</h1>

          <Link to={ROUTES.SALES} className={styles.button}>
            Check out
          </Link>
        </div>
      </section>

      <div className={styles.content}>
        <CategoriesPreview />
        <DiscountBanner />
      </div>
    </div>
  );
}

export default HomePage;
