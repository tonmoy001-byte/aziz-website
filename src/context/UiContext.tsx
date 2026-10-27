import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CartDrawer } from "../components/CartDrawer";
import { CheckoutModal } from "../components/CheckoutModal";

interface UiContextValue {
  cartOpen: boolean;
  checkoutOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const UiContext = createContext<UiContextValue | null>(null);

/**
 * Global overlay UI state (cart drawer, checkout modal).
 *
 * Overlays are mounted here — once — so pages and components no longer
 * receive `onOpenCart` / `onOpenCheckout` callbacks through the tree.
 * Consumers simply call `useUi().openCart()`.
 */
export function UiProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openCheckout = useCallback(() => setCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);

  const gotoCheckout = useCallback(() => {
    setCartOpen(false);
    setCheckoutOpen(true);
  }, []);

  const value = useMemo(
    () => ({ cartOpen, checkoutOpen, openCart, closeCart, openCheckout, closeCheckout }),
    [cartOpen, checkoutOpen, openCart, closeCart, openCheckout, closeCheckout],
  );

  return (
    <UiContext.Provider value={value}>
      {children}
      <CartDrawer open={cartOpen} onClose={closeCart} onCheckout={gotoCheckout} />
      <CheckoutModal open={checkoutOpen} onClose={closeCheckout} />
    </UiContext.Provider>
  );
}

export function useUi(): UiContextValue {
  const ctx = useContext(UiContext);
  if (!ctx) {
    throw new Error("useUi must be used within a UiProvider");
  }
  return ctx;
}
