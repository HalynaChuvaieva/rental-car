import type { Metadata } from "next";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Reliable and budget-friendly rentals for any journey",
};

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "500", "600"],
  variable: "--font-family",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "500", "600"],
  variable: "--second-family",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <footer></footer>
        </TanStackProvider>
      </body>
    </html>
  );
}
