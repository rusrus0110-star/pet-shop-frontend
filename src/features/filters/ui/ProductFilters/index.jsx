import styles from "./style.module.css";

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
  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <span className={styles.label}>Price</span>

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

        <select
          className={styles.select}
          value={sortValue}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">by default</option>
          <option value="price-high-low">price: high-low</option>
          <option value="price-low-high">price: low-high</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilters;
