import Footer from "./components/Footer";
import Header from "./components/Header";
import CartPage from "./components/pages/CartPage";
import HomePage from "./components/pages/HomePage";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
