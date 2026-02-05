import type { Metadata } from "next";
import StoreProvider from "@/lib/providers/StoreProvider";
import "./globals.css";

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
      <body className={` antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
