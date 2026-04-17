import styles from "./style.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>Pet Shop</p>
        <p>Phone: +49 000 000 00 00</p>
        <p>Address: Placeholder address</p>
      </div>
    </footer>
  );
}

export default Footer;
