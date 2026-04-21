import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./style.module.css";

const SORT_OPTIONS = [
  { value: "default", label: "by default" },
  { value: "price-high-low", label: "price: high-low" },
  { value: "price-low-high", label: "price: low-high" },
];

function ProductFilters({
  priceFrom,
  priceTo,
  discountOnly,
  sortValue,
  onPriceFromChange,
  onPriceToChange,
  onDiscountOnlyChange,
  onSortChange,
  showDiscountOnly = true,
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const selectedSortLabel = useMemo(() => {
    const selectedOption = SORT_OPTIONS.find(
      (option) => option.value === sortValue,
    );
    return selectedOption?.label ?? "by default";
  }, [sortValue]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!sortRef.current?.contains(event.target)) {
        setIsSortOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsSortOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsSortOpen(false);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <span className={styles.label}>Price</span>

        <div className={styles.priceInputs}>
          <input
            type="number"
            min="0"
            placeholder="from"
            className={styles.input}
            value={priceFrom}
            onChange={(event) => onPriceFromChange(event.target.value)}
          />

          <input
            type="number"
            min="0"
            placeholder="to"
            className={styles.input}
            value={priceTo}
            onChange={(event) => onPriceToChange(event.target.value)}
          />
        </div>
      </div>

      {showDiscountOnly ? (
        <label className={styles.checkboxGroup}>
          <span className={styles.label}>Discounted items</span>

          <input
            type="checkbox"
            className={styles.checkbox}
            checked={discountOnly}
            onChange={(event) => onDiscountOnlyChange(event.target.checked)}
          />
        </label>
      ) : null}

      <div className={styles.filterGroup}>
        <span className={styles.label}>Sorted</span>

        <div className={styles.selectWrapper} ref={sortRef}>
          <button
            type="button"
            className={`${styles.selectButton} ${isSortOpen ? styles.selectButtonOpen : ""}`}
            onClick={() => setIsSortOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
          >
            <span className={styles.selectButtonText}>{selectedSortLabel}</span>
            <span
              className={`${styles.chevron} ${isSortOpen ? styles.chevronOpen : ""}`}
            >
              ▾
            </span>
          </button>

          {isSortOpen ? (
            <div className={styles.dropdown} role="listbox">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.option} ${
                    sortValue === option.value ? styles.optionActive : ""
                  }`}
                  onClick={() => handleSortSelect(option.value)}
                  role="option"
                  aria-selected={sortValue === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;
