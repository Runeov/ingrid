import "./globals.css";

export const metadata = {
  title: "Inger Helene | Strikk & Interiør",
  description:
    "Nettbutikk for strikkeprodukter og oppskrifter av Inger Helene – interiørdesigner og strikkeentusiast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
