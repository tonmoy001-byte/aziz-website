import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UiProvider } from "./context/UiContext";
import { PRODUCTS } from "./data/products";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { NotFound } from "./pages/NotFound";

const PAGE_TITLES: Record<string, string> = {
  "/": "আজিজ ন্যাচারাল ঔষধালয় | ইউনানী ও হার্বাল পণ্য",
  "/products": "পণ্যসমূহ | আজিজ ন্যাচারাল ঔষধালয়",
  "/about": "আমাদের সম্পর্কে | আজিজ ন্যাচারাল ঔষধালয়",
};

function TitleAndScroll() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[location.pathname] ?? PAGE_TITLES["/"];
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <CartProvider products={PRODUCTS}>
      <BrowserRouter>
        <UiProvider>
          <div className="flex flex-col min-h-[100dvh]">
            <TitleAndScroll />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <FloatingWhatsApp />
          </div>
        </UiProvider>
      </BrowserRouter>
    </CartProvider>
  );
}
