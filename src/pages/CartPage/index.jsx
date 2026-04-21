import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import CartItem from "../../features/cart/ui/CartItem";
import CartSummary from "../../features/cart/ui/CartSummary";
import { selectCartItems } from "../../features/cart/model/cartSelectors";
import { ROUTES } from "../../shared/config/routes";

import styles from "./style.module.css";

function CartPage() {
  const cartItems = useSelector(selectCartItems);

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shopping cart</h1>

          <div className={styles.headerLine} />

          <Link to={ROUTES.CATEGORIES} className={styles.backLink}>
            Back to the store
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.empty}>Your cart is empty.</p>

            <Link to={ROUTES.CATEGORIES} className={styles.emptyLink}>
              Go shopping
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.items}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <CartSummary />
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
