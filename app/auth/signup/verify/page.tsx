"use client";

import VerifyComponent from "@/components/auth/VerifyComponent";
import Spinner from "@/components/loaders/Spinner";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <VerifyComponent />
    </Suspense>
  );
}
