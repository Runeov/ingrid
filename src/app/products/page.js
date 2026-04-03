"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Notification from "@/components/Notification";
import { getProducts, getProduct, addToCart } from "@/lib/store";

const CATEGORIES = [
  { key: "all", label: "Alle" },
  { key: "garn", label: "Garn" },
  { key: "utstyr", label: "Utstyr" },
  { key: "oppskrifter", label: "Oppskrifter" },
];

function ProductDetail({ productId, onBack }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(getProduct(productId));
  }, [productId]);

  function handleAddToCart() {
    addToCart(product);
    window.dispatchEvent(
      new CustomEvent("show-notification", {
        detail: { message: `${product.name} lagt i handlekurven!` },
      })
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: "48px 0", textAlign: "center" }}>
        Produktet ble ikke funnet.{" "}
        <button onClick={onBack} className="btn btn-outline btn-sm" style={{ marginLeft: 8 }}>
          Tilbake
        </button>
      </div>
    );
  }

  const hasRealImage = product.image && product.image.length > 0;
  const emoji =
    product.category === "garn"
      ? "\uD83E\uDDF6"
      : product.category === "utstyr"
      ? "\uD83E\uDEA1"
      : "\uD83D\uDCCB";

  return (
    <div className="container">
      <div style={{ padding: "16px 0" }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "var(--purple)",
            fontSize: "0.9rem",
            cursor: "pointer",
            padding: 0,
          }}
        >
          &larr; Tilbake til produkter
        </button>
      </div>
      <div className="product-detail">
        <div className="product-detail-image">
          {hasRealImage ? (
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius)" }}
            />
          ) : (
            emoji
          )}
        </div>
        <div className="product-detail-info">
          {product.featured && <span className="featured-badge">Anbefalt av Inger Helene</span>}
          <h1>{product.name}</h1>
          <div className="price">{product.price} kr</div>
          <div className="description">{product.description}</div>
          <div className="product-detail-actions">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Legg i handlekurv
            </button>
            <Link href="/cart/" className="btn btn-outline">
              Gå til handlekurv
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setProducts(getProducts());
    // Check URL hash for product id
    const hash = window.location.hash.replace("#", "");
    if (hash) setSelectedId(hash);

    const handler = () => setProducts(getProducts());
    window.addEventListener("products-updated", handler);
    const hashHandler = () => {
      const h = window.location.hash.replace("#", "");
      setSelectedId(h || null);
    };
    window.addEventListener("hashchange", hashHandler);
    return () => {
      window.removeEventListener("products-updated", handler);
      window.removeEventListener("hashchange", hashHandler);
    };
  }, []);

  function selectProduct(id) {
    window.location.hash = id;
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  function goBack() {
    window.location.hash = "";
    setSelectedId(null);
    window.scrollTo(0, 0);
  }

  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  if (selectedId) {
    return (
      <>
        <Navbar />
        <Notification />
        <ProductDetail productId={selectedId} onBack={goBack} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Notification />
      <section className="section">
        <div className="container">
          <h1 className="section-title">
            Våre <span className="accent">Produkter</span>
          </h1>

          <div className="category-filter">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={filter === cat.key ? "active" : ""}
                onClick={() => setFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filtered.map((product) => (
              <div key={product.id} onClick={() => selectProduct(product.id)} style={{ cursor: "pointer" }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <h2>Ingen produkter funnet</h2>
              <p>Prøv en annen kategori.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
