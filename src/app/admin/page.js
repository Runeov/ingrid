"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import { getProducts, addProduct, updateProduct, deleteProduct, generateId } from "@/lib/store";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "garn", featured: false, image: "" });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    loadProducts();
    const handler = () => loadProducts();
    window.addEventListener("products-updated", handler);
    return () => window.removeEventListener("products-updated", handler);
  }, []);

  function loadProducts() {
    setProducts(getProducts());
  }

  function notify(message, type = "success") {
    window.dispatchEvent(new CustomEvent("show-notification", { detail: { message, type } }));
  }

  function resetForm() {
    setForm({ name: "", description: "", price: "", category: "garn", featured: false, image: "" });
    setImagePreview("");
    setEditingProduct(null);
    setShowForm(false);
  }

  function startEdit(product) {
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      featured: product.featured,
      image: product.image || "",
    });
    setImagePreview(product.image || "");
    setEditingProduct(product);
    setShowForm(true);
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setForm((prev) => ({ ...prev, image: dataUrl }));
      setImagePreview(dataUrl);
      notify("Bilde lastet opp!");
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      notify("Produkt oppdatert!");
    } else {
      addProduct({ id: generateId(), ...payload });
      notify("Produkt lagt til!");
    }
    resetForm();
  }

  function handleDelete(id) {
    if (!confirm("Er du sikker på at du vil slette dette produktet?")) return;
    deleteProduct(id);
    notify("Produkt slettet!");
  }

  function toggleFeatured(product) {
    updateProduct(product.id, { featured: !product.featured });
    notify(product.featured ? "Fjernet fra anbefalte" : "Lagt til i anbefalte!");
  }

  const totalProducts = products.length;
  const featuredCount = products.filter((p) => p.featured).length;
  const avgPrice = totalProducts > 0
    ? Math.round(products.reduce((s, p) => s + p.price, 0) / totalProducts)
    : 0;

  const emoji = (cat) =>
    cat === "garn" ? "\uD83E\uDDF6" : cat === "utstyr" ? "\uD83E\uDEA1" : "\uD83D\uDCCB";

  return (
    <>
      <Navbar />
      <Notification />
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2>Admin Panel</h2>
          <Link href="/admin/" className="active">Produkter</Link>
          <Link href="/">Tilbake til butikk</Link>
        </aside>

        <main className="admin-main">
          <h1>Produktadministrasjon</h1>

          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-value">{totalProducts}</div>
              <div className="stat-label">Totalt produkter</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{featuredCount}</div>
              <div className="stat-label">Anbefalte</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{avgPrice} kr</div>
              <div className="stat-label">Gj.snitt pris</div>
            </div>
          </div>

          {!showForm ? (
            <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ marginBottom: 24 }}>
              + Legg til nytt produkt
            </button>
          ) : (
            <div className="form-card" style={{ marginBottom: 32 }}>
              <h2 style={{ marginBottom: 20, fontSize: "1.3rem" }}>
                {editingProduct ? "Rediger produkt" : "Nytt produkt"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Produktnavn</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="F.eks. Myk Merinoull Garn"
                  />
                </div>
                <div className="form-group">
                  <label>Beskrivelse</label>
                  <textarea
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Beskriv produktet..."
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="form-group">
                    <label>Pris (kr)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="149"
                    />
                  </div>
                  <div className="form-group">
                    <label>Kategori</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="garn">Garn</option>
                      <option value="utstyr">Utstyr</option>
                      <option value="oppskrifter">Oppskrifter</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Produktbilde</label>
                  <div
                    className="image-upload"
                    onClick={() => document.getElementById("image-input").click()}
                  >
                    <input
                      id="image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="image-preview" />
                    ) : (
                      <p style={{ color: "var(--gray-600)" }}>
                        Klikk for å laste opp bilde
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      style={{ width: "auto" }}
                    />
                    Vis som anbefalt produkt (forsiden)
                  </label>
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button type="submit" className="btn btn-primary">
                    {editingProduct ? "Lagre endringer" : "Legg til produkt"}
                  </button>
                  <button type="button" className="btn btn-outline" onClick={resetForm}>
                    Avbryt
                  </button>
                </div>
              </form>
            </div>
          )}

          <table className="admin-table">
            <thead>
              <tr>
                <th>Bilde</th>
                <th>Navn</th>
                <th>Kategori</th>
                <th>Pris</th>
                <th>Anbefalt</th>
                <th>Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      <img src={p.image} alt="" className="thumb" />
                    ) : (
                      <div
                        className="thumb"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "var(--purple-light)",
                          fontSize: "1.3rem",
                        }}
                      >
                        {emoji(p.category)}
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price} kr</td>
                  <td>
                    <button
                      className={`toggle-featured ${p.featured ? "is-featured" : "not-featured"}`}
                      onClick={() => toggleFeatured(p)}
                    >
                      {p.featured ? "Anbefalt" : "Ikke anbefalt"}
                    </button>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => startEdit(p)}>
                        Rediger
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                        Slett
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 40, color: "var(--gray-600)" }}>
                    Ingen produkter ennå. Legg til ditt første produkt!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}
