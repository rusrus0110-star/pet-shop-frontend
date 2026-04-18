import instagramIcon from "../../assets/icons/ic-instagram.png";
import whatsappIcon from "../../assets/icons/ic-whatsapp.png";
import mapImage from "../../assets/images/contact/map.png";

import styles from "./style.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contact</h2>

        <div className={styles.cardsGrid}>
          <article className={styles.card}>
            <p className={styles.label}>Phone</p>
            <a href="tel:+493091588492" className={styles.primaryText}>
              +49 30 915-88492
            </a>
          </article>

          <article className={styles.card}>
            <p className={styles.label}>Socials</p>

            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className={styles.socialIcon}
                />
              </a>

              <a
                href="https://wa.me/493091588492"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className={styles.socialLink}
              >
                <img
                  src={whatsappIcon}
                  alt="WhatsApp"
                  className={styles.socialIcon}
                />
              </a>
            </div>
          </article>

          <article className={`${styles.card} ${styles.cardLarge}`}>
            <p className={styles.label}>Address</p>
            <p className={styles.secondaryText}>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </p>
          </article>

          <article className={styles.card}>
            <p className={styles.label}>Working Hours</p>
            <p className={styles.secondaryText}>24 hours a day</p>
          </article>
        </div>

        <div className={styles.mapWrapper}>
          <img src={mapImage} alt="Map" className={styles.mapImage} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
