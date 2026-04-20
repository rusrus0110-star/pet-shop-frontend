import { useEffect, useMemo, useState } from "react";

import Breadcrumbs from "../../widgets/Breadcrumbs";
import ProductCard from "../../entities/product/ui/ProductCard";

import { ROUTES } from "../../shared/config/routes";
import { getSaleProducts } from "../../shared/api/saleProductsApi";

import { DEFAULT_FILTERS } from "../../features/filters/model/constants";
import { filterProducts } from "../../features/filters/model/filterProducts";
import ProductFilters from "../../features/filters/ui/ProductFilters";

import styles from "./style.module.css";

function SalePage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const [priceFrom, setPriceFrom] = useState(DEFAULT_FILTERS.priceFrom);
  const [priceTo, setPriceTo] = useState(DEFAULT_FILTERS.priceTo);
  const [sortValue, setSortValue] = useState(DEFAULT_FILTERS.sortValue);

  useEffect(() => {
    let isMounted = true;

    async function loadSaleProducts() {
      try {
        setStatus("loading");
        setError("");

        const response = await getSaleProducts();

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
        setError(requestError.message || "Failed to load sale products.");
      }
    }

    loadSaleProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, {
      priceFrom,
      priceTo,
      discountOnly: false,
      sortValue,
    });
  }, [products, priceFrom, priceTo, sortValue]);

  const breadcrumbsItems = [
    { label: "Main page", to: ROUTES.HOME },
    { label: "All sales" },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbsItems} />

        <h1 className={styles.title}>Discounted items</h1>

        <ProductFilters
          priceFrom={priceFrom}
          priceTo={priceTo}
          discountOnly={false}
          sortValue={sortValue}
          onPriceFromChange={setPriceFrom}
          onPriceToChange={setPriceTo}
          onDiscountOnlyChange={() => {}}
          onSortChange={setSortValue}
          showDiscountOnly={false}
        />

        {status === "loading" ? (
          <p className={styles.state}>Loading sale products...</p>
        ) : null}

        {status === "error" ? <p className={styles.error}>{error}</p> : null}

        {status === "success" && filteredProducts.length === 0 ? (
          <p className={styles.state}>No sale products found.</p>
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

export default SalePage;
