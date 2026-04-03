export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Inger Helene — Strikk &amp; Interiør</p>
      <p style={{ marginTop: 8 }}>
        Betaling med <a href="https://vipps.no" target="_blank" rel="noopener noreferrer">Vipps</a>
      </p>
    </footer>
  );
}
