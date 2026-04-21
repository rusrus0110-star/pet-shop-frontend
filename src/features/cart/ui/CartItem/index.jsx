import { useDispatch } from "react-redux";

import {
  decrementItemQuantity,
  incrementItemQuantity,
  removeItem,
} from "../../model/cartSlice";
import { getProductImageUrl } from "../../../../shared/lib/getProductImageUrl";
import { getActualPrice } from "../../../../shared/lib/getActualPrice";

import styles from "./style.module.css";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const imageUrl = getProductImageUrl(item.image);
  const actualPrice = getActualPrice(item);
  const totalPrice = actualPrice * item.quantity;

  const handleIncrement = () => {
    dispatch(incrementItemQuantity(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementItemQuantity(item.id));
  };

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img
            className={styles.image}
            src={imageUrl}
            alt={item.title}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder}>No image</div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>

        <div className={styles.meta}>
          <span className={styles.price}>${actualPrice}</span>
          <span className={styles.total}>Total: ${totalPrice}</span>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            type="button"
            onClick={handleDecrement}
            aria-label={`Decrease quantity of ${item.title}`}
          >
            -
          </button>

          <span className={styles.quantity}>{item.quantity}</span>

          <button
            className={styles.controlButton}
            type="button"
            onClick={handleIncrement}
            aria-label={`Increase quantity of ${item.title}`}
          >
            +
          </button>
        </div>
      </div>

      <button
        className={styles.removeButton}
        type="button"
        onClick={handleRemove}
      >
        Remove
      </button>
    </article>
  );
}

export default CartItem;
