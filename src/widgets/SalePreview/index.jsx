import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../../entities/product/ui/ProductCard";
import { ROUTES } from "../../shared/config/routes";
import { getSaleProducts } from "../../shared/api/saleProductsApi";

import styles from "./style.module.css";

const ITEMS_PER_PAGE = 4;

function SalePreview() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function loadSaleProducts() {
      try {
        setStatus("loading");
        setError("");

        const data = await getSaleProducts();

        if (!isMounted) {
          return;
        }

        const normalized = data.map((item) => ({
          id: Number(item.id),
          title: item.title ?? "",
          price: Number(item.price) || 0,
          discountPrice:
            item.discont_price === null || item.discont_price === undefined
              ? null
              : Number(item.discont_price),
          image: item.image ?? "",
        }));

        setProducts(normalized);
        setStatus("success");
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setStatus("error");
        setError(requestError.message || "Failed to load sale products.");
      }
    }

    loadSaleProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const visibleProducts = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [products, page]);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Sale</h2>
          <div className={styles.line} />
        </div>

        <Link to={ROUTES.SALES} className={styles.link}>
          All sales
        </Link>
      </div>

      {status === "loading" ? (
        <p className={styles.state}>Loading sale products...</p>
      ) : null}

      {status === "error" ? <p className={styles.error}>{error}</p> : null}

      {status === "success" ? (
        <>
          <div className={styles.grid}>
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className={styles.navigation}>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={handlePrev}
                disabled={page === 1}
                aria-label="Show previous sale products"
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
                aria-label="Show next sale products"
              >
                →
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

export default SalePreview;
