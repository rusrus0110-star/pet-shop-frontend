import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumbs from "../../widgets/Breadcrumbs";
import ProductCard from "../../entities/product/ui/ProductCard";
import NotFoundPage from "../NotFoundPage";
import { getCategoryWithProducts } from "../../shared/api/categoriesApi";
import { ROUTES } from "../../shared/config/routes";

import styles from "./style.module.css";

const SORT_OPTIONS = [
  { value: "default", label: "by default" },
  { value: "price-asc", label: "price: low-high" },
  { value: "price-desc", label: "price: high-low" },
];

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
  const [sortBy, setSortBy] = useState("default");

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!sortRef.current?.contains(event.target)) {
        setIsSortOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsSortOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadCategoryProducts() {
      try {
        setStatus("loading");
        setError("");
        setCategory(null);
        setProducts([]);

        const response = await getCategoryWithProducts(id);

        if (!isMounted) {
          return;
        }

        if (!response?.category) {
          setCategory(null);
          setProducts([]);
          setStatus("success");
          return;
        }

        setCategory({
          id: Number(response.category.id),
          title: response.category.title ?? "Category",
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

  const selectedSortLabel = useMemo(() => {
    const selectedOption = SORT_OPTIONS.find(
      (option) => option.value === sortBy,
    );
    return selectedOption?.label ?? "by default";
  }, [sortBy]);

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

    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const priceA = a.discountPrice !== null ? a.discountPrice : a.price;
        const priceB = b.discountPrice !== null ? b.discountPrice : b.price;

        return priceA - priceB;
      });
    }

    if (sortBy === "price-desc") {
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

  const handleSortSelect = (value) => {
    setSortBy(value);
    setIsSortOpen(false);
  };

  if (status === "idle" || status === "loading") {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <p className={styles.state}>Loading products...</p>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <p className={styles.error}>{error}</p>
        </div>
      </section>
    );
  }

  if (!category) {
    return <NotFoundPage />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbsItems} />

        <h1 className={styles.title}>{category.title}</h1>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Price</span>

            <div className={styles.priceInputs}>
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

            <div className={styles.selectWrapper} ref={sortRef}>
              <button
                type="button"
                className={`${styles.selectButton} ${
                  isSortOpen ? styles.selectButtonOpen : ""
                }`}
                onClick={() => setIsSortOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
              >
                <span className={styles.selectButtonText}>
                  {selectedSortLabel}
                </span>

                <span
                  className={`${styles.chevron} ${
                    isSortOpen ? styles.chevronOpen : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {isSortOpen ? (
                <div className={styles.dropdown} role="listbox">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`${styles.option} ${
                        sortBy === option.value ? styles.optionActive : ""
                      }`}
                      onClick={() => handleSortSelect(option.value)}
                      role="option"
                      aria-selected={sortBy === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p className={styles.state}>No products found for current filters.</p>
        ) : (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoryProductsPage;
