import { useMemo, useState } from "react";
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

  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
  });

  const [showFormError, setShowFormError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formattedTotal = useMemo(() => {
    return `$${Number(totalPrice).toFixed(2).replace(".", ",")}`;
  }, [totalPrice]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }

    setShowFormError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = formValues.name.trim();
    const trimmedPhone = formValues.phone.trim();
    const trimmedEmail = formValues.email.trim();

    const nextErrors = {
      name: !trimmedName,
      phone: !trimmedPhone,
      email: !trimmedEmail,
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      setShowFormError(true);
      return;
    }

    setShowFormError(false);
    setIsSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsSubmitted(false);
    dispatch(clearCart());

    setFormValues({
      name: "",
      phone: "",
      email: "",
    });

    setErrors({
      name: false,
      phone: false,
      email: false,
    });

    setShowFormError(false);
  };

  return (
    <>
      <aside className={styles.summary}>
        <h2 className={styles.title}>Order details</h2>

        <div className={styles.meta}>
          <span className={styles.itemsCount}>{itemsCount} items</span>
        </div>

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>{formattedTotal}</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <input
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            type="text"
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={handleChange}
            aria-invalid={errors.name}
          />

          <input
            className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formValues.phone}
            onChange={handleChange}
            aria-invalid={errors.phone}
          />

          <input
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            aria-invalid={errors.email}
          />

          {showFormError ? (
            <p className={styles.formError}>
              Please fill in all required fields.
            </p>
          ) : null}

          <button className={styles.orderButton} type="submit">
            Order
          </button>
        </form>
      </aside>

      {isSubmitted ? (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={handleCloseModal}
              aria-label="Close success message"
            >
              ×
            </button>

            <h3 className={styles.modalTitle}>Congratulations!</h3>

            <p className={styles.modalText}>
              Your order has been successfully placed on the website.
            </p>

            <p className={styles.modalText}>
              A manager will contact you shortly to confirm your order.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CartSummary;
