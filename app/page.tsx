import Login from "./components/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerce App",
  description:
    "A seamless platform for discovering and purchasing products on any device.",
};

export default function Page() {
  return <Login />;
}
