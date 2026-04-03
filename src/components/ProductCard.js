export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card-image">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "240px", objectFit: "cover" }}
          />
        ) : (
          getCategoryEmoji(product.category)
        )}
      </div>
      <div className="product-card-body">
        {product.featured && <span className="featured-badge">Anbefalt</span>}
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-price">{product.price} kr</div>
      </div>
      <div className="product-card-footer">
        <span className="btn btn-primary btn-sm" style={{ flex: 1, textAlign: "center" }}>
          Se produkt
        </span>
      </div>
    </div>
  );
}

function getCategoryEmoji(category) {
  switch (category) {
    case "garn": return "\uD83E\uDDF6";
    case "utstyr": return "\uD83E\uDEA1";
    case "oppskrifter": return "\uD83D\uDCCB";
    default: return "\uD83D\uDED2";
  }
}
