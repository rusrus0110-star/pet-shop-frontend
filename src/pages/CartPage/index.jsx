import { useSelector } from "react-redux";

import CartItem from "../../features/cart/ui/CartItem";
import CartSummary from "../../features/cart/ui/CartSummary";
import { selectCartItems } from "../../features/cart/model/cartSelectors";

import styles from "./style.module.css";

function CartPage() {
  const cartItems = useSelector(selectCartItems);

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping cart</h1>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>Your cart is empty.</p>
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
