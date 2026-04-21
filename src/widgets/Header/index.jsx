import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/icons/logo.png";
import basketIcon from "../../assets/icons/basket.png";

import { ROUTES } from "../../shared/config/routes";
import { selectCartItemsCount } from "../../features/cart/model/cartSelectors";

import styles from "./style.module.css";

const navItems = [
  { label: "Main Page", to: ROUTES.HOME },
  { label: "Categories", to: ROUTES.CATEGORIES },
  { label: "All products", to: ROUTES.PRODUCTS },
  { label: "All sales", to: ROUTES.SALES },
];

function Header() {
  const cartItemsCount = useSelector(selectCartItemsCount);

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

          {cartItemsCount > 0 ? (
            <span className={styles.badge}>{cartItemsCount}</span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

export default Header;
