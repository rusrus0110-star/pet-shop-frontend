import Breadcrumbs from "../../widgets/Breadcrumbs";
import CategoriesPreview from "../../widgets/CategoriesPreview";

import styles from "./style.module.css";

function CategoriesPage() {
  const breadcrumbsItems = [
    { label: "Main page", to: "/" },
    { label: "Categories" },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbsItems} />
        <h1 className={styles.title}>Categories</h1>
        <CategoriesPreview showAll />
      </div>
    </section>
  );
}

export default CategoriesPage;
