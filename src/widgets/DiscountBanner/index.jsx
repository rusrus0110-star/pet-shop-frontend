import { useState } from "react";

import petsBanner from "../../assets/images/discount/pets-banner.svg";
import { sendSaleRequest } from "../../shared/api/saleApi";

import styles from "./style.module.css";

const initialFormState = {
  name: "",
  phone: "",
  email: "",
};

function DiscountBanner() {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const preparedData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
    };

    if (!preparedData.name || !preparedData.phone || !preparedData.email) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await sendSaleRequest(preparedData);

      setIsSuccess(true);
      setFormData(initialFormState);
    } catch (submitError) {
      setError(submitError.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.banner}>
      <h2 className={styles.title}>5% off on the first order</h2>

      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img src={petsBanner} alt="Pets" className={styles.image} />
        </div>

        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              autoComplete="name"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              autoComplete="tel"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              autoComplete="email"
            />

            <button
              type="submit"
              className={
                isSuccess
                  ? `${styles.button} ${styles.buttonSuccess}`
                  : styles.button
              }
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting
                ? "Sending..."
                : isSuccess
                  ? "Request Submitted"
                  : "Get a discount"}
            </button>

            {error ? <p className={styles.error}>{error}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}

export default DiscountBanner;
