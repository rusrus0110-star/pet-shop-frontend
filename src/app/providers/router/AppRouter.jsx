import { Route, Routes } from "react-router-dom";

import { ROUTES } from "../../../shared/config/routes";
import MainLayout from "../../../shared/layouts/MainLayout";

import HomePage from "../../../pages/HomePage";
import CategoriesPage from "../../../pages/CategoriesPage";
import CategoryProductsPage from "../../../pages/CategoryProductsPage";
import AllProductsPage from "../../../pages/AllProductsPage";
import SalePage from "../../../pages/SalePage";
import ProductPage from "../../../pages/ProductPage";
import CartPage from "../../../pages/CartPage";
import NotFoundPage from "../../../pages/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
        <Route
          path={ROUTES.CATEGORY_PRODUCTS}
          element={<CategoryProductsPage />}
        />
        <Route path={ROUTES.PRODUCTS} element={<AllProductsPage />} />
        <Route path={ROUTES.SALES} element={<SalePage />} />
        <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
