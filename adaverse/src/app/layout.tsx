// app/layout.tsx
// export const metadata = {
//   title: "Adaverse",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="fr">
//       <body>{children}</body>
//     </html>
//   );
// }
// app/layout.tsx
import { ReactNode } from "react";

export const metadata = {
  title: "Adaverse",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
