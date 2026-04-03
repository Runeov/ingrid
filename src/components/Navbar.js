"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const update = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
      } catch {
        setCartCount(0);
      }
    };
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="navbar-brand">
          Inger <span>Helene</span>
        </Link>
        <ul className="navbar-links">
          <li><Link href="/">Hjem</Link></li>
          <li><Link href="/products/">Produkter</Link></li>
          <li>
            <Link href="/cart/">
              Handlekurv
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          <li><Link href="/admin/">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}
