import type { Product } from "../types";
import productsData from "./products.json";

/**
 * Catalog source-of-truth is `products.json` — plain data the owner can edit
 * (or we can later fetch from a CMS) without touching component code.
 * This module attaches the `Product` type contract.
 */
export const PRODUCTS = productsData as Product[];
