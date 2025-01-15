"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ServerChildComponent from "@/app/add-product/serverChildComponent";

const AddProduct: React.FC = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // Hold rendering until check is done

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || role !== "admin") {
        router.replace("/");
      } else {
        setIsAuthorized(true); // Allow rendering
      }
    }
  }, [router]);

  if (isAuthorized === null) {
    return null; // Render nothing while the check is ongoing
  }

  return <ServerChildComponent />;
};

export default AddProduct;
