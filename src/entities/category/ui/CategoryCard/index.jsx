import { Link } from "react-router-dom";

import { ROUTES } from "../../../../shared/config/routes";
import { getImageUrl } from "../../../../shared/lib/getImageUrl";

import styles from "./style.module.css";

function CategoryCard({ category }) {
  const imageUrl = getImageUrl(category.image);

  return (
    <Link
      to={ROUTES.CATEGORY_PRODUCTS.replace(":id", String(category.id))}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder}>No image</div>
        )}
      </div>

      <h3 className={styles.title}>{category.title}</h3>
    </Link>
  );
}

export default CategoryCard;
