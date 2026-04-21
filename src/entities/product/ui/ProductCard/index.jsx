import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../../../shared/config/routes";
import { getProductImageUrl } from "../../../../shared/lib/getProductImageUrl";
import { addItem } from "../../../../features/cart/model/cartSlice";
import { selectCartItemQuantityById } from "../../../../features/cart/model/cartSelectors";

import styles from "./style.module.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const quantityInCart = useSelector(selectCartItemQuantityById(product.id));
  const isAdded = quantityInCart > 0;

  const imageUrl = getProductImageUrl(product.image);

  const hasDiscount =
    product.discountPrice !== null &&
    product.discountPrice !== undefined &&
    Number(product.discountPrice) > 0;

  const currentPrice = hasDiscount ? product.discountPrice : product.price;

  const discountPercent = useMemo(() => {
    if (!hasDiscount || Number(product.price) <= 0) {
      return 0;
    }

    return Math.round(
      ((Number(product.price) - Number(product.discountPrice)) /
        Number(product.price)) *
        100,
    );
  }, [hasDiscount, product.price, product.discountPrice]);

  const productDetailsPath = ROUTES.PRODUCT_DETAILS.replace(
    ":id",
    String(product.id),
  );

  function handleAddToCart() {
    if (isAdded) {
      return;
    }

    dispatch(
      addItem({
        product,
        quantity: 1,
      }),
    );
  }

  return (
    <article className={styles.card}>
      <Link to={productDetailsPath} className={styles.productLink}>
        <div className={styles.imageWrapper}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.title}
              className={styles.image}
              loading="lazy"
            />
          ) : (
            <div className={styles.placeholder}>No image</div>
          )}

          {hasDiscount ? (
            <div className={styles.badge}>-{discountPercent}%</div>
          ) : null}

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.addButton} ${
                isAdded ? styles.addButtonAdded : ""
              }`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleAddToCart();
              }}
              aria-label={
                isAdded ? "Product added to cart" : "Add product to cart"
              }
              disabled={isAdded}
            >
              {isAdded ? "Added" : "Add to cart"}
            </button>
          </div>
        </div>

        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.prices}>
          <span className={styles.currentPrice}>${currentPrice}</span>

          {hasDiscount ? (
            <span className={styles.oldPrice}>${product.price}</span>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
