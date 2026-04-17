import { Link, NavLink } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { ROUTES } from "../../shared/config/routes";
import styles from "./style.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          Pet Shop
        </Link>

        <nav className={styles.nav}>
          <NavLink to={ROUTES.HOME} className={styles.link}>
            Main Page
          </NavLink>
          <NavLink to={ROUTES.CATEGORIES} className={styles.link}>
            Categories
          </NavLink>
          <NavLink to={ROUTES.PRODUCTS} className={styles.link}>
            All Products
          </NavLink>
          <NavLink to={ROUTES.SALES} className={styles.link}>
            All Sales
          </NavLink>
        </nav>

        <Link to={ROUTES.CART} className={styles.cart}>
          <ShoppingCartOutlined className={styles.cartIcon} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
