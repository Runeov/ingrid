"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="empty-state" style={{ padding: "80px 24px" }}>
        <h2>404 — Siden ble ikke funnet</h2>
        <p>Beklager, vi fant ikke det du lette etter.</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 20 }}>
          Tilbake til forsiden
        </Link>
      </div>
      <Footer />
    </>
  );
}
