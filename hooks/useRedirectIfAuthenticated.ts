"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function useRedirectIfAuthenticated() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("ifetoVendorToken")
        : null;

    console.log("Token:", token);

    // If logged in AND trying to access /auth
    if (token && pathname.startsWith("/auth/")) {
      router.replace("/");
      return; // ⛔ stop execution so loading does not change now
    }

    // If NOT logged in or path is normal → stop loading
    setLoading(false);
  }, [pathname, router]);

  return { loading };
}
