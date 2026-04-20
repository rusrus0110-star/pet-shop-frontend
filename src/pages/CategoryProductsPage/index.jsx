import { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumbs from "../../widgets/Breadcrumbs";
import ProductCard from "../../entities/product/ui/ProductCard";
import { getCategoryWithProducts } from "../../shared/api/categoriesApi";
import { ROUTES } from "../../shared/config/routes";

import styles from "./style.module.css";

const SORT_OPTIONS = {
  DEFAULT: "default",
  PRICE_ASC: "price-asc",
  PRICE_DESC: "price-desc",
};

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeProduct(product) {
  return {
    id: Number(product.id),
    title: product.title ?? "",
    price: toNumber(product.price),
    discountPrice:
      product.discont_price === null || product.discont_price === undefined
        ? null
        : Number(product.discont_price),
    image: product.image ?? "",
  };
}

function CategoryProductsPage() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.DEFAULT);

  useEffect(() => {
    let isMounted = true;

    async function loadCategoryProducts() {
      try {
        setStatus("loading");
        setError("");

        const response = await getCategoryWithProducts(id);

        if (!isMounted) {
          return;
        }

        setCategory({
          id: Number(response?.category?.id),
          title: response?.category?.title ?? "Category",
        });

        const normalizedProducts = Array.isArray(response?.data)
          ? response.data.map(normalizeProduct)
          : [];

        setProducts(normalizedProducts);
        setStatus("success");
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setStatus("error");
        setError(requestError.message || "Failed to load category products.");
      }
    }

    loadCategoryProducts();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const filteredProducts = useMemo(() => {
    const from = priceFrom.trim() === "" ? null : Number(priceFrom);
    const to = priceTo.trim() === "" ? null : Number(priceTo);

    let result = [...products];

    result = result.filter((product) => {
      const finalPrice =
        product.discountPrice !== null ? product.discountPrice : product.price;

      if (Number.isFinite(from) && finalPrice < from) {
        return false;
      }

      if (Number.isFinite(to) && finalPrice > to) {
        return false;
      }

      if (discountOnly && product.discountPrice === null) {
        return false;
      }

      return true;
    });

    if (sortBy === SORT_OPTIONS.PRICE_ASC) {
      result.sort((a, b) => {
        const priceA = a.discountPrice !== null ? a.discountPrice : a.price;
        const priceB = b.discountPrice !== null ? b.discountPrice : b.price;

        return priceA - priceB;
      });
    }

    if (sortBy === SORT_OPTIONS.PRICE_DESC) {
      result.sort((a, b) => {
        const priceA = a.discountPrice !== null ? a.discountPrice : a.price;
        const priceB = b.discountPrice !== null ? b.discountPrice : b.price;

        return priceB - priceA;
      });
    }

    return result;
  }, [products, priceFrom, priceTo, discountOnly, sortBy]);

  const breadcrumbsItems = [
    { label: "Main page", to: ROUTES.HOME },
    { label: "Categories", to: ROUTES.CATEGORIES },
    { label: category?.title ?? "Category" },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbsItems} />

        <h1 className={styles.title}>{category?.title ?? "Category"}</h1>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Price</span>

            <input
              type="number"
              min="0"
              placeholder="from"
              value={priceFrom}
              onChange={(event) => setPriceFrom(event.target.value)}
              className={styles.input}
            />

            <input
              type="number"
              min="0"
              placeholder="to"
              value={priceTo}
              onChange={(event) => setPriceTo(event.target.value)}
              className={styles.input}
            />
          </div>

          <label className={styles.checkboxGroup}>
            <span className={styles.filterLabel}>Discounted items</span>
            <input
              type="checkbox"
              checked={discountOnly}
              onChange={(event) => setDiscountOnly(event.target.checked)}
              className={styles.checkbox}
            />
          </label>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Sorted</span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className={styles.select}
            >
              <option value={SORT_OPTIONS.DEFAULT}>by default</option>
              <option value={SORT_OPTIONS.PRICE_ASC}>price: low-high</option>
              <option value={SORT_OPTIONS.PRICE_DESC}>price: high-low</option>
            </select>
          </div>
        </div>

        {status === "loading" ? (
          <p className={styles.state}>Loading products...</p>
        ) : null}

        {status === "error" ? <p className={styles.error}>{error}</p> : null}

        {status === "success" && filteredProducts.length === 0 ? (
          <p className={styles.state}>No products found for current filters.</p>
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

export default CategoryProductsPage;
