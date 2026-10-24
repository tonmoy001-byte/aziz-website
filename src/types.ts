export type Product = {
  id: string;
  nameBn: string;
  categoryBn: string;
  price: number;
  oldPrice?: number;
  sizeBn: string;
  shortDescBn: string;
  descriptionBn: string;
  ingredientsBn: string;
  usageBn: string;
  cautionBn: string;
  image: string;
  inStock: boolean;
  isFeatured: boolean;
  isDemo: true;
};

export type CartItem = {
  productId: string;
  qty: number;
};

export type OrderLine = {
  nameBn: string;
  qty: number;
  unitPrice: number;
};

export type OrderInput = {
  name: string;
  phone: string;
  address: string;
  note?: string;
  lines: OrderLine[];
  subtotal: number;
  delivery: number;
  total: number;
};

export type PageTitle = { title: string; description?: string };
