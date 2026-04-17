import { useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchCategories } from "../../entities/category/model/categoriesThunks";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesStatus,
} from "../../entities/category/model/categoriesSelectors";

import { ROUTES } from "../../shared/config/routes";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import AppLoader from "../../shared/ui/AppLoader";
import AppError from "../../shared/ui/AppError";

import CategoryCard from "../../entities/category/ui/CategoryCard";

import styles from "./style.module.css";

function CategoriesPreview() {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const status = useAppSelector(selectCategoriesStatus);
  const error = useAppSelector(selectCategoriesError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const previewItems = categories.slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>Categories</h2>

        <Link to={ROUTES.CATEGORIES} className={styles.link}>
          All categories
        </Link>
      </div>

      {status === "loading" && <AppLoader />}

      {status === "failed" && <AppError message={error} />}

      {status === "succeeded" && (
        <div className={styles.grid}>
          {previewItems.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoriesPreview;
