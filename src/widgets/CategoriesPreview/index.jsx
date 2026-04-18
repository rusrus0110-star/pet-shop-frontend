import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import CategoryCard from "../../entities/category/ui/CategoryCard";
import { ROUTES } from "../../shared/config/routes";
import { getAllCategories } from "../../shared/api/categoriesApi";

import styles from "./style.module.css";

const ITEMS_PER_PAGE = 4;

function CategoriesPreview() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        setStatus("loading");
        setError("");

        const data = await getAllCategories();

        if (!isMounted) return;

        const normalized = data.map((item) => ({
          id: Number(item.id),
          title: item.title ?? "",
          image: item.image ?? "",
        }));

        setCategories(normalized);
        setStatus("success");
      } catch (err) {
        if (!isMounted) return;

        setStatus("error");
        setError(err.message || "Failed to load categories");
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const visibleCategories = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [categories, page]);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>Categories</h2>

        <Link to={ROUTES.CATEGORIES} className={styles.link}>
          All categories
        </Link>
      </div>

      {status === "loading" && (
        <p className={styles.state}>Loading categories...</p>
      )}

      {status === "error" && <p className={styles.error}>{error}</p>}

      {status === "success" && (
        <>
          <div className={styles.grid}>
            {visibleCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.navigation}>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={handlePrev}
                disabled={page === 1}
                aria-label="Show previous categories"
              >
                ←
              </button>

              <span className={styles.pageInfo}>
                {page} / {totalPages}
              </span>

              <button
                type="button"
                className={styles.arrowButton}
                onClick={handleNext}
                disabled={page === totalPages}
                aria-label="Show next categories"
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default CategoriesPreview;
