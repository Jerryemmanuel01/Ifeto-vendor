import type { Metadata } from "next";
import StoreProvider from "@/lib/providers/StoreProvider";
import { Inter, Nunito_Sans } from "next/font/google";
import { Suspense } from "react";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "IFETO E-Commerce Vendor",
  description: "Your shopping from abroad made easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased ${inter.className} ${nunito.className}`}>
        <StoreProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
