import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Search Ads Auction Simulator",
  description: "Real Rails PoC 52 dashboard for keyword auction rank, CPC, and margin outcomes."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
