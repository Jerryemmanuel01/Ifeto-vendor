import type { Metadata } from "next";
import StoreProvider from "@/lib/providers/StoreProvider";
import { Inter, Nunito_Sans } from "next/font/google";
import { Suspense } from "react";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "IFETO E-Commerce Vendor",
  description: "Your shopping from abroad made easier",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` antialiased ${inter.className} ${nunito.className}`}>
        <StoreProvider>
          <ClientLayout>{children}</ClientLayout>
          <Toaster richColors position="top-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
