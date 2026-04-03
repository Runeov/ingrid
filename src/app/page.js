"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/store";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setFeatured(getFeaturedProducts());
    const handler = () => setFeatured(getFeaturedProducts());
    window.addEventListener("products-updated", handler);
    return () => window.removeEventListener("products-updated", handler);
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="container">
          <h1>
            Strikk med <span className="highlight">Inger Helene</span>
          </h1>
          <p>
            Vakre garn, inspirerende oppskrifter og alt du trenger for ditt
            neste strikkeprosjekt — håndplukket av interiørdesigner Inger Helene.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/products/" className="btn btn-primary">
              Se alle produkter
            </Link>
            <Link href="/products/" className="btn btn-outline">
              Oppskrifter
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">
            Inger Helenes <span className="accent">Favoritter</span>
          </h2>
          <div className="product-grid">
            {featured.map((product) => (
              <div key={product.id} onClick={() => router.push(`/products/#${product.id}`)} style={{ cursor: "pointer" }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {featured.length === 0 && (
            <div className="empty-state">
              <h2>Ingen anbefalte produkter ennå</h2>
              <p>Sjekk tilbake snart!</p>
            </div>
          )}
        </div>
      </section>

      <section
        style={{
          background: "linear-gradient(135deg, var(--purple) 0%, var(--pink) 100%)",
          padding: "64px 24px",
          color: "white",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: "2rem", marginBottom: 16 }}>Om Inger Helene</h2>
          <p style={{ maxWidth: 600, margin: "0 auto", opacity: 0.9, fontSize: "1.05rem", lineHeight: 1.8 }}>
            Som interiørdesigner og strikkeentusiast kombinerer Inger Helene sin
            lidenskap for vakre farger og teksturer. Her finner du nøye utvalgte
            garn, unike oppskrifter og alt du trenger for å skape noe vakkert
            med hendene.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
