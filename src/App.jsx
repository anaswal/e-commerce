import Footer from "./components/Footer";
import Header from "./components/Header";
import CartPage from "./components/pages/CartPage";
import HomePage from "./components/pages/HomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import NotFoundPage from "./components/pages/NotFoundPage";
import LoginPage from "./components/pages/LoginPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import ProductManagementPage from "./components/pages/admin/ProductManagementPage";
import CreateProductPage from "./components/pages/admin/CreateProductPage";
import EditProductPage from "./components/pages/admin/EditProductPage";

function App() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/product/:productId" Component={ProductDetailPage} />
        <Route path="/admin">
          <Route path="products" Component={ProductManagementPage} />
          <Route path="products/create" Component={CreateProductPage} />
          <Route path="products/edit/:productId" Component={EditProductPage} />
        </Route>
        <Route path="*" Component={NotFoundPage} />
      </Routes>
      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App;
