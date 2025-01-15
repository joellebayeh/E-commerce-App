"use client";

import Login from "./components/login";
import type { Metadata } from "next";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

// export const metadata: Metadata = {
//   title: "E-commerce App",
//   description:
//     "A seamless platform for discovering and purchasing products on any device.",
// };

export default function Page() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // Hold rendering until check is done

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token) {
        router.replace(
            `${
                role === "admin"
                    ? "/add-product"
                    : "/product-list"
            }`
        );
      } else {
        setIsAuthorized(true); // Allow rendering
      }
    }
  }, [router]);

  if (isAuthorized === null) {
    return null; // Render nothing while the check is ongoing
  }
  return <Login />;
}
