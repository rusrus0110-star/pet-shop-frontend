import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Footer from "../../widgets/Footer";
import Breadcrumbs from "../../widgets/Breadcrumbs";

import { addItem } from "../../features/cart/model/cartSlice";
import { selectCartItemQuantityById } from "../../features/cart/model/cartSelectors";

import { getProductById } from "../../shared/api/productsApi";
import { getProductImageUrl } from "../../shared/lib/getProductImageUrl";

import styles from "./style.module.css";

function ProductPage() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const quantityInCart = useSelector(selectCartItemQuantityById(productId));

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const descriptionRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        setStatus("loading");
        setError("");

        const data = await getProductById(productId);

        if (!isMounted) return;

        setProduct(data);
        setStatus("success");
      } catch (requestError) {
        if (!isMounted) return;

        setStatus("error");
        setError(requestError.message || "Failed to load product.");
      }
    }

    if (productId) {
      loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [productId]);

  useLayoutEffect(() => {
    if (!descriptionRef.current || !product?.description) {
      setIsOverflowing(false);
      return;
    }

    const element = descriptionRef.current;

    const checkOverflow = () => {
      if (isExpanded) {
        setIsOverflowing(true);
        return;
      }

      setIsOverflowing(element.scrollHeight > element.clientHeight + 1);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [product?.description, isExpanded]);

  const imageUrl = useMemo(() => {
    if (!product) return "";
    return getProductImageUrl(product.image);
  }, [product]);

  const hasDiscount =
    product?.discountPrice !== null &&
    product?.discountPrice !== undefined &&
    Number(product.discountPrice) > 0;

  const currentPrice = hasDiscount ? product.discountPrice : product?.price;

  const discountPercent =
    hasDiscount && Number(product?.price) > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100,
        )
      : 0;

  const isAdded = quantityInCart > 0;
  const displayedQuantity = isAdded ? quantityInCart : selectedQuantity;

  const handleDecrease = () => {
    if (isAdded) return;
    setSelectedQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrease = () => {
    if (isAdded) return;
    setSelectedQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product || isAdded) return;

    dispatch(
      addItem({
        product,
        quantity: selectedQuantity,
      }),
    );
  };

  const breadcrumbItems = useMemo(() => {
    if (!product) return [];

    const items = [
      { label: "Main page", to: "/" },
      { label: "Categories", to: "/categories" },
    ];

    if (product.categoryId) {
      items.push({
        label: product.categoryTitle || "Category",
        to: `/categories/${product.categoryId}`,
      });
    } else {
      items.push({
        label: product.categoryTitle || "Category",
      });
    }

    items.push({
      label: product.title,
    });

    return items;
  }, [product]);

  if (status === "loading") {
    return (
      <>
        <main className={styles.page}>
          <div className={styles.container}>
            <p className={styles.state}>Loading product...</p>
          </div>
        </main>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <main className={styles.page}>
          <div className={styles.container}>
            <p className={styles.error}>{error}</p>
          </div>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <main className={styles.page}>
          <div className={styles.container}>
            <p className={styles.state}>Product not found.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className={styles.page}>
        <div className={styles.container}>
          <Breadcrumbs items={breadcrumbItems} />

          <section className={styles.productSection}>
            <div className={styles.gallery}>
              <div className={styles.mainImageWrapper}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className={styles.mainImage}
                  />
                ) : (
                  <div className={styles.placeholder}>No image</div>
                )}
              </div>
            </div>

            <div className={styles.info}>
              <h1 className={styles.title}>{product.title}</h1>

              <div className={styles.priceRow}>
                <span className={styles.currentPrice}>${currentPrice}</span>

                {hasDiscount ? (
                  <>
                    <span className={styles.oldPrice}>${product.price}</span>
                    <span className={styles.badge}>-{discountPercent}%</span>
                  </>
                ) : null}
              </div>

              <div className={styles.actionsRow}>
                <div
                  className={`${styles.quantityControl} ${isAdded ? styles.quantityControlLocked : ""}`}
                >
                  <button
                    type="button"
                    className={styles.quantityButton}
                    onClick={handleDecrease}
                    aria-label="Decrease quantity"
                    disabled={isAdded}
                  >
                    -
                  </button>

                  <span className={styles.quantityValue}>
                    {displayedQuantity}
                  </span>

                  <button
                    type="button"
                    className={styles.quantityButton}
                    onClick={handleIncrease}
                    aria-label="Increase quantity"
                    disabled={isAdded}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className={`${styles.addToCartButton} ${
                    isAdded ? styles.addedButton : ""
                  }`}
                  onClick={handleAddToCart}
                  disabled={isAdded}
                >
                  {isAdded ? "Added" : "Add to cart"}
                </button>
              </div>

              {isAdded ? (
                <div className={styles.cartHint}>
                  <span className={styles.cartHintText}>
                    Product added to cart.
                  </span>

                  <div className={styles.cartHintActions}>
                    <Link to="/cart" className={styles.cartHintLinkPrimary}>
                      Go to cart
                    </Link>

                    <Link
                      to="/categories"
                      className={styles.cartHintLinkSecondary}
                    >
                      Continue shopping
                    </Link>
                  </div>
                </div>
              ) : null}

              <div className={styles.descriptionBlock}>
                <h2 className={styles.descriptionTitle}>Description</h2>

                <div
                  ref={descriptionRef}
                  className={`${styles.descriptionText} ${
                    isExpanded ? styles.descriptionTextExpanded : ""
                  }`}
                >
                  {product.description}
                </div>

                {isOverflowing ? (
                  <button
                    type="button"
                    className={styles.readMoreButton}
                    onClick={() => setIsExpanded((prev) => !prev)}
                  >
                    {isExpanded ? "Hide" : "Read more"}
                  </button>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default ProductPage;
