"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only verify on client side
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("ifetoVendorToken");

    // If NOT logged in AND trying to access protected route (like dashboard)
    if (
      !token &&
      (pathname.startsWith("/dashboard") || pathname.startsWith("/settings"))
    ) {
      router.replace("/auth/login");
      return;
    }

    // If logged in, or route is public
    setLoading(false);
  }, [pathname, router]);

  return { loading };
}
