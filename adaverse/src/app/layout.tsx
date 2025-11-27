// app/layout.tsx
export const metadata = {
  title: "Adaverse",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
