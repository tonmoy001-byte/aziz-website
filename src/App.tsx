import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { PRODUCTS } from "./data/products";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { About } from "./pages/About";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const onOpenCart = () => setCartOpen(true);
  const onOpenCheckout = () => setCheckoutOpen(true);

  return (
    <CartProvider products={PRODUCTS}>
      <HashRouter>
        <div className="flex flex-col min-h-[100dvh]">
          <TitleAndScroll />
          <Header onOpenCart={onOpenCart} />
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <Home onOpenCart={onOpenCart} onOpenCheckout={onOpenCheckout} />
                }
              />
              <Route
                path="/products"
                element={
                  <Products
                    onOpenCart={onOpenCart}
                    onOpenCheckout={onOpenCheckout}
                  />
                }
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            onCheckout={() => {
              setCartOpen(false);
              setCheckoutOpen(true);
            }}
          />
          <CheckoutModal
            open={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
          />
          <FloatingWhatsApp />
        </div>
      </HashRouter>
    </CartProvider>
  );
}
