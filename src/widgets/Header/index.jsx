import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/icons/logo.png";
import basketIcon from "../../assets/icons/basket.png";

import { ROUTES } from "../../shared/config/routes";
import styles from "./style.module.css";

const navItems = [
  { label: "Main Page", to: ROUTES.HOME },
  { label: "Categories", to: ROUTES.CATEGORIES },
  { label: "All products", to: ROUTES.PRODUCTS },
  { label: "All sales", to: ROUTES.SALES },
];

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          to={ROUTES.HOME}
          className={styles.logoLink}
          aria-label="Go to home page"
        >
          <img src={logo} alt="Pet Shop logo" className={styles.logo} />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to={ROUTES.CART}
          className={styles.cartLink}
          aria-label="Open shopping cart"
        >
          <img src={basketIcon} alt="Basket" className={styles.cartIcon} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
