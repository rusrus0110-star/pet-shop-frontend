import { useEffect, useMemo, useState } from "react";

import Breadcrumbs from "../../widgets/Breadcrumbs";
import ProductCard from "../../entities/product/ui/ProductCard";

import { ROUTES } from "../../shared/config/routes";
import { getAllProducts } from "../../shared/api/productsApi";

import { DEFAULT_FILTERS } from "../../features/filters/model/constants";
import { filterProducts } from "../../features/filters/model/filterProducts";
import ProductFilters from "../../features/filters/ui/ProductFilters";

import styles from "./style.module.css";

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const [priceFrom, setPriceFrom] = useState(DEFAULT_FILTERS.priceFrom);
  const [priceTo, setPriceTo] = useState(DEFAULT_FILTERS.priceTo);
  const [discountOnly, setDiscountOnly] = useState(
    DEFAULT_FILTERS.discountOnly,
  );
  const [sortValue, setSortValue] = useState(DEFAULT_FILTERS.sortValue);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setStatus("loading");
        setError("");

        const response = await getAllProducts();

        if (!isMounted) {
          return;
        }

        setProducts(Array.isArray(response) ? response : []);
        setStatus("success");
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setStatus("error");
        setError(requestError.message || "Failed to load products.");
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, {
      priceFrom,
      priceTo,
      discountOnly,
      sortValue,
    });
  }, [products, priceFrom, priceTo, discountOnly, sortValue]);

  const breadcrumbsItems = [
    { label: "Main page", to: ROUTES.HOME },
    { label: "All products" },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbsItems} />

        <h1 className={styles.title}>All products</h1>

        <ProductFilters
          priceFrom={priceFrom}
          priceTo={priceTo}
          discountOnly={discountOnly}
          sortValue={sortValue}
          onPriceFromChange={setPriceFrom}
          onPriceToChange={setPriceTo}
          onDiscountOnlyChange={setDiscountOnly}
          onSortChange={setSortValue}
        />

        {status === "loading" ? (
          <p className={styles.state}>Loading products...</p>
        ) : null}

        {status === "error" ? <p className={styles.error}>{error}</p> : null}

        {status === "success" && filteredProducts.length === 0 ? (
          <p className={styles.state}>No products found.</p>
        ) : null}

        {status === "success" && filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default AllProductsPage;
