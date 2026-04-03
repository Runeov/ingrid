"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order_id");
  const demo = params.get("demo");

  return (
    <div className="success-page">
      <div className="success-icon">{"\u2705"}</div>
      <h1>Takk for din bestilling!</h1>
      {orderId && (
        <p style={{ color: "var(--gray-600)", marginBottom: 8 }}>
          Ordre-ID: <strong>{orderId}</strong>
        </p>
      )}
      {demo && (
        <p
          style={{
            background: "var(--yellow-light)",
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: "0.9rem",
            marginBottom: 16,
          }}
        >
          Demo-modus — Vipps er ikke konfigurert ennå.
        </p>
      )}
      <p style={{ color: "var(--gray-600)", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
        Vi har mottatt din bestilling og sender den så snart som mulig. Du vil
        motta en bekreftelse på e-post.
      </p>
      <Link href="/" className="btn btn-primary">
        Tilbake til forsiden
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ textAlign: "center", padding: 48 }}>Laster...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
