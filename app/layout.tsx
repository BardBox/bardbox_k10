import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "K10 INDEX - Premium Real Estate in Vadodara",
  description: "Discover premium commercial properties including shops, offices, and showrooms in Vadodara. K10 INDEX offers exceptional real estate opportunities.",
  keywords: "real estate, Vadodara, commercial property, shops, offices, showrooms, K10 INDEX",
  openGraph: {
    title: "K10 INDEX - Premium Real Estate in Vadodara",
    description: "Discover premium commercial properties in Vadodara",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
