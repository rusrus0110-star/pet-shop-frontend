import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllCategories } from "../../shared/api/categoriesApi";
import { ROUTES } from "../../shared/config/routes";
import { getCategoryImageUrl } from "../../shared/lib/getCategoryImageUrl";

import styles from "./style.module.css";

function CategoriesPreview({ showAll = false }) {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        setStatus("loading");
        setError("");

        const data = await getAllCategories();

        if (!isMounted) {
          return;
        }

        const normalized = data.map((item) => ({
          id: Number(item.id),
          title: item.title ?? "",
          image: item.image ?? "",
        }));

        setCategories(normalized);
        setStatus("success");
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setStatus("error");
        setError(requestError.message || "Failed to load categories.");
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <section className={styles.section}>
      {!showAll ? (
        <div className={styles.head}>
          <div className={styles.titleGroup}>
            <h2 className={styles.title}>Categories</h2>
            <div className={styles.line} />
          </div>

          <Link to={ROUTES.CATEGORIES} className={styles.link}>
            All categories
          </Link>
        </div>
      ) : null}

      {status === "loading" ? (
        <p className={styles.state}>Loading categories...</p>
      ) : null}

      {status === "error" ? <p className={styles.error}>{error}</p> : null}

      {status === "success" ? (
        <div className={styles.grid}>
          {visibleCategories.map((category) => (
            <Link
              key={category.id}
              to={ROUTES.CATEGORY_PRODUCTS.replace(":id", String(category.id))}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={getCategoryImageUrl(category.image)}
                  alt={category.title}
                  className={styles.image}
                  loading="lazy"
                />
              </div>

              <p className={styles.cardTitle}>{category.title}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default CategoriesPreview;
