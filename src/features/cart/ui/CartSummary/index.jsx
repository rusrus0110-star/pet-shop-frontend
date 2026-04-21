import { useDispatch, useSelector } from "react-redux";

import {
  selectCartItemsCount,
  selectCartTotalPrice,
} from "../../model/cartSelectors";
import { clearCart } from "../../model/cartSlice";

import styles from "./style.module.css";

function CartSummary() {
  const dispatch = useDispatch();

  const itemsCount = useSelector(selectCartItemsCount);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <aside className={styles.summary}>
      <h2 className={styles.title}>Order details</h2>

      <div className={styles.row}>
        <span>Items</span>
        <span>{itemsCount}</span>
      </div>

      <div className={styles.row}>
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>

      <button
        className={styles.clearButton}
        type="button"
        onClick={handleClearCart}
      >
        Clear cart
      </button>
    </aside>
  );
}

export default CartSummary;
