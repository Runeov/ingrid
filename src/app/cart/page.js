"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Notification from "@/components/Notification";
import { getCart, saveCart, clearCart } from "@/lib/store";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
    const handler = () => setCart(getCart());
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  function updateQuantity(id, delta) {
    const newCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
      .filter((item) => item.quantity > 0);
    saveCart(newCart);
  }

  function removeItem(id) {
    saveCart(cart.filter((item) => item.id !== id));
  }

  function handleCheckout() {
    const orderId = "IH-" + Date.now().toString(36).toUpperCase();
    clearCart();
    window.location.href =
      (process.env.NEXT_PUBLIC_BASE_PATH || "") +
      "/checkout/success/?order_id=" + orderId + "&demo=true";
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const emoji = (cat) =>
    cat === "garn" ? "\uD83E\uDDF6" : cat === "utstyr" ? "\uD83E\uDEA1" : "\uD83D\uDCCB";

  return (
    <>
      <Navbar />
      <Notification />
      <div className="container cart-page">
        <h1 className="section-title">Handlekurv</h1>

        {cart.length === 0 ? (
          <div className="empty-state">
            <h2>Handlekurven er tom</h2>
            <p>Legg til noen vakre strikkeprodukter!</p>
            <Link href="/products/" className="btn btn-primary" style={{ marginTop: 20 }}>
              Se produkter
            </Link>
          </div>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Produkt</th>
                  <th>Pris</th>
                  <th>Antall</th>
                  <th>Sum</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="cart-item-name">
                        <div
                          className="cart-item-thumb"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "var(--purple-light)",
                            fontSize: "1.5rem",
                          }}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt=""
                              style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                            />
                          ) : (
                            emoji(item.category)
                          )}
                        </div>
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{item.price} kr</td>
                    <td>
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{item.price * item.quantity} kr</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
                        Fjern
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary">
              <div className="cart-total">Totalt: {total} kr</div>
              <button className="btn btn-vipps" onClick={handleCheckout}>
                Betal med Vipps
              </button>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", marginTop: 8 }}>
                Demo-modus — Vipps aktiveres med API-nøkler
              </p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
