import { Link } from "react-router-dom";

import { ROUTES } from "../../../../shared/config/routes";
import { getProductImageUrl } from "../../../../shared/lib/getProductImageUrl";

import styles from "./style.module.css";

function ProductCard({ product }) {
  const imageUrl = getProductImageUrl(product.image);

  const hasDiscount =
    product.discountPrice !== null &&
    product.discountPrice !== undefined &&
    Number(product.discountPrice) > 0;

  const currentPrice = hasDiscount ? product.discountPrice : product.price;

  const discountPercent =
    hasDiscount && Number(product.price) > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100,
        )
      : 0;

  return (
    <Link
      to={ROUTES.PRODUCT_DETAILS.replace(":id", String(product.id))}
      className={styles.card}
    >
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
      </div>

      <h3 className={styles.title}>{product.title}</h3>

      <div className={styles.prices}>
        <span className={styles.currentPrice}>${currentPrice}</span>

        {hasDiscount ? (
          <span className={styles.oldPrice}>${product.price}</span>
        ) : null}
      </div>
    </Link>
  );
}

export default ProductCard;
