import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Product } from "../types";
import { SITE_CONFIG } from "../config/siteConfig";
import { formatBdt } from "../utils/bn";

type CartState = {
  items: Record<string, number>;
};

type CartAction =
  | { type: "LOAD"; items: Record<string, number> }
  | { type: "ADD"; productId: string; qty: number }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QTY"; productId: string; qty: number }
  | { type: "CLEAR" };

const STORAGE_KEY = "aziz_cart_v1";

function loadCart(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed)
    ) {
      return parsed as Record<string, number>;
    }
    return {};
  } catch {
    return {};
  }
}

function saveCart(items: Record<string, number>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage blocked; app continues to work without persistence
  }
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "LOAD":
      return { items: action.items };
    case "ADD": {
      const items = {
        ...state.items,
        [action.productId]: Math.min(
          (state.items[action.productId] ?? 0) + action.qty,
          20,
        ),
      };
      saveCart(items);
      return { items };
    }
    case "REMOVE": {
      const { [action.productId]: _removed, ...rest } = state.items;
      saveCart(rest);
      return { items: rest };
    }
    case "SET_QTY": {
      const items = { ...state.items };
      if (action.qty <= 0) {
        delete items[action.productId];
      } else {
        items[action.productId] = Math.min(action.qty, 20);
      }
      saveCart(items);
      return { items };
    }
    case "CLEAR":
      saveCart({});
      return { items: {} };
    default:
      return state;
  }
}

interface CartProviderProps {
  children: ReactNode;
  products: Product[];
}

interface CartContextValue {
  items: { product: Product; qty: number }[];
  itemCount: number;
  subtotal: number;
  delivery: number;
  freeDeliveryAbove: number;
  total: number;
  deliveryHint: string;
  isEmpty: boolean;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  getItemQty: (productId: string) => number;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  products,
}: CartProviderProps) {
  const productsById = useMemo(
    () => new Map(products.map((p) => [p.id, p])),
    [products],
  );

  const [state, dispatch] = useReducer(reducer, {
    items: loadCart(),
  });

  // Persist initial load on mount if storage had data.
  useEffect(() => {
    dispatch({ type: "LOAD", items: loadCart() });
  }, []);

  const items = useMemo(
    () =>
      Object.entries(state.items)
        .map(([productId, qty]) => {
          const product = productsById.get(productId);
          return product ? { product, qty } : null;
        })
        .filter((item): item is { product: Product; qty: number } =>
          Boolean(item),
        )
        .sort((a, b) => a.product.nameBn.localeCompare(b.product.nameBn, "bn")),
    [state.items, productsById],
  );

  const subtotal = items.reduce(
    (sum, { product, qty }) => sum + product.price * qty,
    0,
  );

  const freeDeliveryAbove = Number(SITE_CONFIG.freeDeliveryAbove);
  const delivery =
    freeDeliveryAbove > 0 && subtotal >= freeDeliveryAbove
      ? 0
      : Number(SITE_CONFIG.deliveryChargeBn);
  const total = subtotal + delivery;
  const itemCount = items.reduce((sum, { qty }) => sum + qty, 0);
  const isEmpty = items.length === 0;

  let deliveryHint = "";
  if (!isEmpty && freeDeliveryAbove > 0 && subtotal < freeDeliveryAbove) {
    const remaining = freeDeliveryAbove - subtotal;
    deliveryHint = `আর ${formatBdt(remaining)} কেনাকাটা করলে ডেলিভারি ফ্রি`;
  }

  const addToCart = useCallback(
    (product: Product, qty: number = 1) => {
      dispatch({
        type: "ADD",
        productId: product.id,
        qty: Math.max(1, Math.min(Math.round(qty), 20)),
      });
    },
    [],
  );

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: "REMOVE", productId });
  }, []);

  const setQuantity = useCallback((productId: string, qty: number) => {
    dispatch({ type: "SET_QTY", productId, qty });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const getItemQty = useCallback(
    (productId: string) => state.items[productId] ?? 0,
    [state.items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      delivery,
      freeDeliveryAbove,
      total,
      deliveryHint,
      isEmpty,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      getItemQty,
    }),
    [
      items,
      itemCount,
      subtotal,
      delivery,
      freeDeliveryAbove,
      total,
      deliveryHint,
      isEmpty,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      getItemQty,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
