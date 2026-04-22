import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";

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

  const handleChange = (fieldName) => (event) => {
    const value = event.target.value;

    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: false,
      }));
    }

    setShowFormError(false);
  };

  const handleSubmit = () => {
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

        <div className={styles.form}>
          <Input
            size="large"
            placeholder="Name"
            value={formValues.name}
            onChange={handleChange("name")}
            status={errors.name ? "error" : ""}
            className={styles.input}
          />

          <Input
            size="large"
            placeholder="Phone number"
            value={formValues.phone}
            onChange={handleChange("phone")}
            status={errors.phone ? "error" : ""}
            className={styles.input}
          />

          <Input
            size="large"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange("email")}
            status={errors.email ? "error" : ""}
            className={styles.input}
          />

          {showFormError ? (
            <p className={styles.formError}>
              Please fill in all required fields.
            </p>
          ) : null}

          <Button
            type="primary"
            size="large"
            block
            className={styles.orderButton}
            onClick={handleSubmit}
          >
            Order
          </Button>
        </div>
      </aside>

      {isSubmitted ? (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalCard}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={handleCloseModal}
              aria-label="Close success modal"
            >
              ×
            </button>

            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Congratulations!</h3>

              <p className={styles.modalText}>
                Your order has been successfully placed on the website.
              </p>

              <p className={styles.modalText}>
                A manager will contact you shortly to confirm your order.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CartSummary;
