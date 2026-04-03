"use client";

const STORAGE_KEY = "inger-helene-products";
const CART_KEY = "cart";

const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Myk Merinoull Garn",
    description: "Nydelig merinoull i vakre farger. Perfekt for gensere, skjerf og luer. 100g per nøste.",
    price: 149,
    image: "",
    category: "garn",
    featured: true,
  },
  {
    id: "2",
    name: "Strikkepinne Sett Bambus",
    description: "Komplett sett med bambus strikkepinner i forskjellige størrelser. Lette og behagelige å jobbe med.",
    price: 299,
    image: "",
    category: "utstyr",
    featured: true,
  },
  {
    id: "3",
    name: "Oppskrift: Koselig Vintergenser",
    description: "Detaljert oppskrift for en vakker vintergenser med norsk mønster. Inkluderer størrelser S-XXL.",
    price: 89,
    image: "",
    category: "oppskrifter",
    featured: false,
  },
  {
    id: "4",
    name: "Alpakka Garn Premium",
    description: "Luksuriøst alpakkagarn. Utrolig mykt og varmt. Perfekt for eksklusive prosjekter.",
    price: 199,
    image: "",
    category: "garn",
    featured: true,
  },
  {
    id: "5",
    name: "Oppskrift: Babyteppe i Bomull",
    description: "Enkel og vakker oppskrift for et mykt babyteppe. Perfekt gave til nyfødte. Inkluderer garnforslag.",
    price: 69,
    image: "",
    category: "oppskrifter",
    featured: false,
  },
  {
    id: "6",
    name: "Maskemarkører Sett (20 stk)",
    description: "Fargerike maskemarkører i metall. Uunnværlig verktøy for mønsterstrikk og rundt strikk.",
    price: 79,
    image: "",
    category: "utstyr",
    featured: false,
  },
];

function read() {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

function write(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event("products-updated"));
}

export function getProducts() {
  return read();
}

export function getProduct(id) {
  return read().find((p) => p.id === id) || null;
}

export function getFeaturedProducts() {
  return read().filter((p) => p.featured);
}

export function addProduct(product) {
  const products = read();
  products.push(product);
  write(products);
  return product;
}

export function updateProduct(id, updates) {
  const products = read();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...updates };
  write(products);
  return products[idx];
}

export function deleteProduct(id) {
  const products = read();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  write(filtered);
  return true;
}

// ---- Cart ----

export function getCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

// ---- Generate ID ----

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
